import {DataPoints} from "./data-points.interface";
import {DataSet} from "./data-set.interface";

export interface DashboardData {
  dataPoints: DataPoints;
  dataSets: DataSet[];
}
