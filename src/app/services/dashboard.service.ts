import { Injectable } from '@angular/core';
import { newLayoutResponse, backendDataResponse } from '../dashboard-mock-response';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  async getLayout(): Promise<any> {
    return Promise.resolve(newLayoutResponse)
  }

  async getData(): Promise<any> {
    return Promise.resolve(backendDataResponse)
  }
}
