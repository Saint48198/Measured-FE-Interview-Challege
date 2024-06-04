import {Component, Input, SimpleChanges} from '@angular/core';
import {NgForOf, DecimalPipe, NgIf, JsonPipe} from "@angular/common";
import {WidthConversionPipe} from "../../shared/width-conversion";
import {DataValueComponent} from "../data-value/data-value.component";

@Component({
  selector: 'app-data-set',
  templateUrl: './data-set.component.html',
  standalone: true,
  imports: [
    DecimalPipe,
    NgForOf,
    NgIf,
    WidthConversionPipe,
    DataValueComponent,
    JsonPipe
  ],
  styleUrls: ['./data-set.component.css']
})
export class DataSetComponent {
  @Input() elements: any[] = [];
  @Input() label: string | undefined;

  totalRow: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if ('elements' in changes) {
      this.totalRow = this.createTotalRow();
    }
  }

  createTotalRow() {
    const totalRow: any[] = [];
    this.elements.forEach((element) => {
      const fieldDefinitions = element.fieldDefinitions;
      const data = element.data;
      const keys = element.fields.map((field: any) => field.name);

      fieldDefinitions.forEach((fieldDefinition: any, index: number) => {
        const aggFn = fieldDefinition.aggFn || 'none';

        if (aggFn) {
          if (aggFn === 'sum') {
            const total = data.reduce((acc: any, item: any) => {
              const currentKey = keys[index];
              return acc + item[currentKey];
            }, 0);

            totalRow.push(total);
          } else if (aggFn === 'average') {
            const avg = data.reduce((acc: any, item: any) => {
              const currentKey = keys[index];

              return acc + item[currentKey];
            }, 0) / data.length;
            
            totalRow.push(avg);
          } else {
            totalRow.push('');

            if (index === 0 && fieldDefinition.type === 'string') {
              totalRow[index] = 'Total';
            } else if (fieldDefinition.format === 'percent' && aggFn === 'none') {
             totalRow[index] = ' - ';
            }
          }
        }
      });
    });

    return totalRow;
  }
}
