import axios from 'axios';
import { StorySummaryModel, storyTypes, storyStates } from './storyObjects';

const apiUriBase = "http://localhost:5000/api";

const mockStorySummaryModel = {
  title: "Create Stuff For Things",
  storyType: storyTypes.feature,
  estimate: 8,
  currentState: storyStates.started,
  ownerIds: [3225277]
}

export const getStorySummaryById = (id: number) => {
  return new Promise((resolve, reject) => {
    resolve(mockStorySummaryModel);
  })
  // return axios.get<StorySummary>(`${apiUriBase}/stories${id}/summary`)
  //   .then(response => response.data)
}