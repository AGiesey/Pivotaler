import axios, { AxiosRequestConfig } from 'axios';
import { IterationModel, IterationDataPointModel } from './burndownDataModels'

const apiUriBase = "http://localhost:5000/api";

const baseOptions: AxiosRequestConfig = {
  withCredentials: true
}

export const getIterationBurndown = (iterationId: number) => {
  return axios.get<IterationModel>(`${apiUriBase}/burndown/${iterationId}`)
    .then(response => response.data);
}

export const getIterationById = (iterationId: number) => {
  return axios.get(`${apiUriBase}/iteration/${iterationId}`)
    .then(response => response.data);
}

export const updateIteration = (iterationId: number, model: any) => {
  return axios.put(`${apiUriBase}/iteration/${iterationId}`, model, baseOptions)
    .then(response => response.data);
}

export const addNewIteration = (iteration: IterationModel) => {
  return axios.post(`${apiUriBase}/iteration/new`, iteration, baseOptions)
    .then(response => console.log("Add Iteration", response));
}

export const addNewDatapoint = (datapoint: IterationDataPointModel, iterationId: number) => {
  return axios.post(`${apiUriBase}/iteration/${iterationId}/datapoints/new`, datapoint, baseOptions)
    .then(response => console.log("Add Datapoint", response));
}

export const getDatapointById = (datapointId: number) => {
  return axios.get<IterationDataPointModel>(`${apiUriBase}/iteration/datapoints/${datapointId}`)
    .then(result => result.data);
}

export const updateDatapoint = (datapointId: number, model: any) => {
  return axios.put<IterationDataPointModel>(`${apiUriBase}/iteration/datapoints/${datapointId}`, model, baseOptions)
    .then(response => response.data);
}

export const getRecentIterations = (count: number = 5) => {
  return axios.get<IterationModel[]>(`${apiUriBase}/iteration/recent`)
    .then(response => response.data);
}