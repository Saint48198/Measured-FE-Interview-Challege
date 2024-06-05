import { TestBed } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';
import { newLayoutResponse, backendDataResponse } from '../dashboard-mock-response';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardService]
    });
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a new layout from getLayout()', async () => {
    const layout = await service.getLayout();
    expect(layout).toEqual(newLayoutResponse);
  });

  it('should return data from getData()', async () => {
    const data = await service.getData();
    expect(data).toEqual(backendDataResponse);
  });
});
