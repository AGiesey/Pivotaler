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

export const addNewIteration = (iteration: IterationModel) => {
  return axios.post(`${apiUriBase}/iteration/new`, iteration, baseOptions)
    .then(response => console.log("Add Iteration", response));
}

export const addNewDatapoint = (datapoint: IterationDataPointModel, iterationId: number) => {
  return axios.post(`${apiUriBase}/iteration/${iterationId}/datapoints/new`, datapoint, baseOptions)
    .then(response => console.log("Add Datapoint", response));
}