import axios, { AxiosRequestConfig } from 'axios';

const apiBaseUri = 'https://www.pivotaltracker.com/services/v5/projects/836745/';

const config: AxiosRequestConfig = {
  headers: {
    'X-TrackerToken': 'de3c3f98865f45ba9be2207777392782'
  },
  params: {
    'filter': 'labels:"sprint backlog"'
  }

}

export const getSprintBacklogStories = () => {
  return axios.get(`${apiBaseUri}stories`, config)
}