import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import {NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {DataPointComponent} from "../components/data-point/data-point.component";
import {DataSetComponent} from "../components/data-set/data-set.component";
import {WidthConversionPipe} from "../shared/width-conversion";
import {FieldDefinition} from "../shared/field-definition.interface";
import {FieldTitle} from "../shared/field-title.interface";
import {LayoutElement} from "../shared/layout-element.interface";
import {SectionElement} from "../shared/section-element.interface";
import {DashboardData} from "../shared/dashboard-data.interface";
import {DataSet} from "../shared/data-set.interface";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    NgIf,
    DataPointComponent,
    DataSetComponent,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    WidthConversionPipe,
    NgClass
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  layoutSections: LayoutElement[]  = [];
  fieldDefinitions: FieldDefinition = {} as FieldDefinition;
  data: DashboardData = {} as DashboardData;
  dashboardPageTitle = 'Dashboard';

  constructor(private dashboardService: DashboardService) {
  }

  async ngOnInit() {
    await this.getLayout();
    await this.getData();

    this.layoutSections = this.mergeDashboardResponses(this.layoutSections, this.data);
    console.log('Merged layout sections:', this.layoutSections);
  }

  private async getLayout(): Promise<void> {
    try {
      const layoutData = await this.dashboardService.getLayout();
      this.layoutSections = layoutData.layout || [];
      this.fieldDefinitions = layoutData.fieldDefinitions || {};
      this.dashboardPageTitle = layoutData.displayName || 'Dashboard';
    } catch (error) {
      console.error(error);
    }
  }

  private async getData(): Promise<void> {
    try {
      this.data = await this.dashboardService.getData();
    } catch (error) {
      console.error(error);
    }
  }

  mergeDashboardResponses(layoutSections: LayoutElement[], dataResponse: DashboardData) {
    if (!layoutSections || !Array.isArray(layoutSections) || layoutSections.length === 0) {
      console.error('No layout sections found:', layoutSections);
      return []; // Handle missing layout
    }

    if (!dataResponse || !dataResponse.dataPoints || !dataResponse.dataSets) {
      console.error('Invalid data response:', dataResponse);
      return []; // Handle missing data
    }

    const mergedSections: LayoutElement[] = [];
    layoutSections.forEach((section: LayoutElement) => {
      const mergedSection: LayoutElement = { ...section };
      if (section.elements && section.elements.length > 0) {
        if (section.type === 'DATA_POINT') {
            mergedSection.elements = section.elements.map((element: SectionElement) => {
            const mergedElement: SectionElement = { ...element };

            if (dataResponse.dataPoints[element.name]) {
              const selectedFieldDefinition: FieldDefinition = this.fieldDefinitions[element.name];
              const value = dataResponse.dataPoints[element.name];

              mergedElement.format = selectedFieldDefinition.format;
              mergedElement.digitsInfo = selectedFieldDefinition.digitsInfo;
              mergedElement.label = selectedFieldDefinition.label;
              mergedElement.data = value;
            } else {
              console.error('No data found for element:', element);
            }
            return mergedElement;
          });
        } else if (section.type === 'DATA_SET') {
          mergedSection.elements = section.elements.map((element: SectionElement) => {
            const mergedElement: SectionElement = { ...element };
            const dataSet:DataSet | undefined = dataResponse.dataSets.find((dataSet: DataSet) => dataSet.name === element.name);
            const fieldDefinitions: any = [];

            mergedElement.fields?.forEach((field: FieldTitle) => {
              field.label = this.fieldDefinitions[field.name].label;
              fieldDefinitions.push(this.fieldDefinitions[field.name]);
            });

            if (dataSet) {
              mergedElement.fieldDefinitions = fieldDefinitions;
              mergedElement.data = dataSet.data;
            } else {
              console.error('No data found for element:', element);
            }

            return mergedElement;
          });
        }
      }
      mergedSections.push(mergedSection);
    });

    return mergedSections;
  }

  getClassFromColumns(columns: number): string {
    // may need to expand this to handle more cases
    switch (columns) {
      case 12:
        return 'full'; // For full width, might not need this if 12 is default
      case 6:
        return 'half';
      case 4:
        return 'one-third';
      case 3:
        return 'one-quarter';
      default:
        return ''; // Default case if none of these
    }
  }
}
