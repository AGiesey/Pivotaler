// TODO: Delete this class and move logic to the backend.
import axios, { AxiosRequestConfig } from 'axios';
import { ProjectSnapshot, StorySnapshot, StoryType, StoryState, Story } from './burndownInterfaces';

const apiBaseUri = 'https://www.pivotaltracker.com/services/v5/projects/836745/';

export const getBurndown = () => {
  return getBacklogStoriesAndProjectSnapshots()
    .then(([stories, snapshots]) => {
      return [
        new Map(stories.map((x: any) => ([x.id, x]))),
        snapshots
      ]
    })
    .then(([storyMap, snapshots]) => {
      return snapshots.map((snapshotDay: any) => createBurndownDay(snapshotDay, storyMap))
    })
}

/**
 * Wait for project snapshots and all the backlog stores then 
 * return them as a touple
 */
const getBacklogStoriesAndProjectSnapshots = () => {
  return Promise.all(
    [getCurrentBacklogStories(),
    getProjectSnapshots()]
  )
}

/**
 * get the daily snapshots for a (todo: given) two week time period
 */
const getProjectSnapshots = () => {
  const config: AxiosRequestConfig = {
    headers: {
      'X-TrackerToken': "not valid"
    },
    params: {
      'start_date': '2020-01-20',
      'end_date': '2020-01-31'
    }
  }

  return axios.get(`${apiBaseUri}history/snapshots`, config)
    .then(response => response.data);
}

/**
 * Get all stories from the sprint backlog epic
 */
const getCurrentBacklogStories = () => {
  const config: AxiosRequestConfig = {
    headers: {
      'X-TrackerToken': "not valid"
    },
    params: {
      'filter': 'labels:"sprint backlog"'
    }
  }

  return axios.get(`${apiBaseUri}stories`, config)
    .then(response => response.data);
}

/**
 * Given a single day in a snapshot, return the cumulative count of points for every story which is in the
 * current backlog epic and not status "accepted" or "rejected" (maybe rethink rejected)
 * 
 * @param day: ProjectSnapshot
 * @param burnDownStories: Map<number, Story>
 * 
 * @returns BurndownDatapoint
 */
const createBurndownDay = (day: ProjectSnapshot, burndownStories: Map<number, Story>) => {
  var totalPoints = 0;
  
  var unfinishedStories =  day.current.filter((story: StorySnapshot) => 
    (story.story_type === StoryType.bug || 
    story.story_type === StoryType.chore ||
    story.story_type === StoryType.feature) &&
    story.state !== StoryState.accepted &&
    burndownStories.has(story.story_id)
  );
  
  if (unfinishedStories && unfinishedStories.length) {
    totalPoints = unfinishedStories
      .map(story => story.estimate ? story.estimate : 0)
      .reduce((reducer, current) => reducer! += current!);
  }
  
  return {date: day.date, totalPoints: totalPoints}
}