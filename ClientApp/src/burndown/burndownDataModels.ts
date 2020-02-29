export interface DatapointModel {
  date: any,
  remainingPoints: number;
  remainingEverhourPoints?: number;
}

export interface IterationModel {
  //id?: number;
  startDate: any;
  endDate: any;
  initialPoints: number;
  initialEverhourPoints: number;
  datapoints?: IterationDataPointModel[];
}

export interface IterationDataPointModel {
  id?: number;
  iterationId: number;
  dateTime: any;
  remainingPoints: number;
  remainingEverhourPoints: number;
}