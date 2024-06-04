import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { newLayoutResponse, backendDataResponse } from '../dashboard-mock-response';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  getLayout(): Observable<any> {
    return of(newLayoutResponse);
  }

  getData(): Observable<any> {
    return of(backendDataResponse);
  }
}
