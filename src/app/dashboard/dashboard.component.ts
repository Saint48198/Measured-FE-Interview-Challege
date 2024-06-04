import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {DataPointComponent} from "../components/data-point/data-point.component";
import {DataSetComponent} from "../components/data-set/data-set.component";

interface FieldDefinition {
  label: string;
  format: string;
  type: string;
  digitsInfo: string;
  aggFn: string;
}

interface LayoutElement {
  name: string;  // This should match with data keys
  type: string;
  label: string;
  width: number;
  elements: SectionElement[];  // Nested elements for data sets
}

interface SectionElement {
  name:string;
  type: string;
  width: number;
  data: any;
}

interface DashboardLayout {
  displayName: string;
  fieldDefinitions: { [key: string]: FieldDefinition };
  layout: LayoutElement[];
}

interface DataPoints {
  [key: string]: number;
}

interface DataSet {
  name: string;
  data: any[];  // Ideally, you should define a type for the data items
}

interface DashboardData {
  dataPoints: DataPoints;
  dataSets: DataSet[];
}

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
    NgSwitchCase
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  layoutSections: LayoutElement[]  = [];
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
              mergedElement.data = dataResponse.dataPoints[element.name];
            } else {
              console.error('No data found for element:', element);
            }
            return mergedElement;
          });
        } else if (section.type === 'DATA_SET') {
          mergedSection.elements = section.elements.map((element: SectionElement) => {
            const mergedElement: SectionElement = { ...element };
            const dataSet:DataSet | undefined = dataResponse.dataSets.find((dataSet: DataSet) => dataSet.name === element.name);
            console.log('Merging data set:', dataSet, 'for element:', mergedElement);
            if (dataSet) {
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
}
