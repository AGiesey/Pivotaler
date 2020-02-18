import axios from 'axios';
import { StorySummaryModel, storyTypes, storyStates, StoryDetailsModel } from './storyObjects';

const apiUriBase = "http://localhost:5000/api";

export const getStorySummaryById = (id: number) => {
  return axios.get<StorySummaryModel>(`${apiUriBase}/stories/${id}/summary`)
    .then(response => response.data);
}

export const getStoryDetailsById = (id: number) => {
  return axios.get<StoryDetailsModel>(`${apiUriBase}/stories/${id}/details`)
    .then(response => response.data);
}

export const getSprintBacklogStories = (searchId: string) => {
  const options = {
    params: {
      "userSearchId": searchId
    }
  }
  return axios.get<StorySummaryModel[]>(`${apiUriBase}/stories/sprintBacklog`, options)
    .then(response => response.data)
}