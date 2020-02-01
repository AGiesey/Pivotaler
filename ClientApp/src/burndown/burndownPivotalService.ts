import axios, { AxiosRequestConfig } from 'axios';

const apiBaseUri = 'https://www.pivotaltracker.com/services/v5/projects/836745/';
const token = 'de3c3f98865f45ba9be2207777392782';

export interface BurndownDatapoint {
  date: any;
  totalPoints: number;
}

const createBurndownData = (data: any[]): BurndownDatapoint[] => {
  return data.map(x => ({date: x.date, totalPoints: x.current.length}))
}

export const getProjectSnapshots = () => {
  const config: AxiosRequestConfig = {
    headers: {
      'X-TrackerToken': token
    },
    params: {
      'start_date': '2020-01-20',
      'end_date': '2020-02-01'
    }
  }

  return axios.get(`${apiBaseUri}history/snapshots`, config)
    .then(response => response.data);
}

export const getCurrentBacklogStories = () => {
  const config: AxiosRequestConfig = {
    headers: {
      'X-TrackerToken': token
    },
    params: {
      'filter': 'labels:"sprint backlog"'
    }
  }

  return axios.get(`${apiBaseUri}stories`, config)
    .then(response => response.data);
}

export const getBurndown = () => {
  const config: AxiosRequestConfig = {
    headers: {
      'X-TrackerToken': 'de3c3f98865f45ba9be2207777392782'
    },
    params: {
      'start_date': '2020-01-20',
      'end_date': '2020-02-01'
    }
  }

  return axios.get(`${apiBaseUri}history/snapshots`, config)
    .then(
      response => createBurndownData(response.data)
    )
}