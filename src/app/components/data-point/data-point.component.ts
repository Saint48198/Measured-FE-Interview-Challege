import { Component, Input } from '@angular/core';
import {NgForOf, DecimalPipe, CurrencyPipe, NgIf, PercentPipe, DatePipe} from "@angular/common";
import {WidthConversionPipe} from "../../shared/width-conversion";
import {DataValueComponent} from "../data-value/data-value.component";

@Component({
  selector: 'app-data-point',
  templateUrl: './data-point.component.html',
  standalone: true,
  imports: [
    DecimalPipe,
    NgForOf,
    WidthConversionPipe,
    CurrencyPipe,
    NgIf,
    PercentPipe,
    DatePipe,
    DataValueComponent
  ],
  styleUrls: ['./data-point.component.css']
})
export class DataPointComponent {
  @Input() elements: any[] | undefined;
  @Input() label: string | undefined;
}
