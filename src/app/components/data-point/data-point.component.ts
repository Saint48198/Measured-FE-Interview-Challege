import { Component, Input } from '@angular/core';
import {NgForOf, DecimalPipe } from "@angular/common";
import {CamelCaseToWordsPipe} from "../../shared/camel-case-to-words.pipe";

@Component({
  selector: 'app-data-point',
  templateUrl: './data-point.component.html',
  standalone: true,
  imports: [
    DecimalPipe,
    NgForOf,
    CamelCaseToWordsPipe
  ],
  styleUrls: ['./data-point.component.css']
})
export class DataPointComponent {
  @Input() elements: any[] | undefined;
  @Input() label: string | undefined;
}
