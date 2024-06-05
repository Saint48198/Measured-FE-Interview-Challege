import {Component, Input, ViewEncapsulation} from '@angular/core';
import {CurrencyPipe, DatePipe, DecimalPipe, NgIf, PercentPipe} from "@angular/common";

@Component({
  selector: 'app-data-value',
  templateUrl: './data-value.component.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    NgIf,
    PercentPipe
  ],
  styleUrls: ['./data-value.component.css']
})
export class DataValueComponent {
  @Input() value: any | undefined;
  @Input() format: string | undefined;
  @Input() digitsInfo: string | undefined;
  protected readonly isNaN = isNaN;
}
