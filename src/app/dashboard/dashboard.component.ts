import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  layout: any;
  data: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getLayout().subscribe(layout => {
      this.layout = layout;
    });
    this.dashboardService.getData().subscribe(data => {
      this.data = data;
    });
  }
}
