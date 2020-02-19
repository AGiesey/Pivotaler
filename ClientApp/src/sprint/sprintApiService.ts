import axios from 'axios';
import { StorySummaryModel } from '../story/storyObjects'

const apiUriBase = "http://localhost:5000/api";

export const getSprintBacklogStories = (searchId: string) => {
  const options = {
    params: {
      "userSearchId": searchId
    }
  }
  return axios.get<StorySummaryModel[]>(`${apiUriBase}/search/swimLane`, options)
    .then(response => response.data)
}
