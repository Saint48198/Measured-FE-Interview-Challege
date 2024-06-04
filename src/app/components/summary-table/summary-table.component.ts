import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-table',
  templateUrl: './summary-table.component.html',
  standalone: true,
  styleUrls: ['./summary-table.component.css']
})
export class SummaryTableComponent {
  @Input() tableData: any;
  @Input() tableFields: any;
}
