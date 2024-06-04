import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-metrics-overview',
  templateUrl: './metrics-overview.component.html',
  standalone: true,
  styleUrls: ['./metrics-overview.component.css']
})
export class MetricsOverviewComponent {
  @Input() metrics: any;
}
