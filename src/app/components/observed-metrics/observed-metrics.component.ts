import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-observed-metrics',
  templateUrl: './observed-metrics.component.html',
  standalone: true,
  styleUrls: ['./observed-metrics.component.css']
})
export class ObservedMetricsComponent {
  @Input() metrics: any;
}
