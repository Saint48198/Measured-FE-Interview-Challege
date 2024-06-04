import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-source-metrics',
  templateUrl: './source-metrics.component.html',
  standalone: true,
  styleUrls: ['./source-metrics.component.css']
})
export class SourceMetricsComponent {
  @Input() metrics: any;
}
