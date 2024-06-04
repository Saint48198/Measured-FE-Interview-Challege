import { Component, Input } from '@angular/core';
import {NgForOf, DecimalPipe, NgIf} from "@angular/common";
import {CamelCaseToWordsPipe} from "../../shared/camel-case-to-words.pipe";

@Component({
  selector: 'app-data-set',
  templateUrl: './data-set.component.html',
  standalone: true,
  imports: [
    DecimalPipe,
    NgForOf,
    NgIf,
    CamelCaseToWordsPipe
  ],
  styleUrls: ['./data-set.component.css']
})
export class DataSetComponent {
  @Input() elements: any[] | undefined;
  @Input() label: string | undefined;
}
