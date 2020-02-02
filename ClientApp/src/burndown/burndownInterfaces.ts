export interface Story {
  kind: string, // TODO: make enum
  id: number,
  created_at: string,
  updated_at: string,
  accepted_at: string,
  estimate: number,
  story_type: string, // TODO: make enum
  name: string,
  description: string,
  current_state: string, // TODO: make enum
  requested_by_id: number,
  url: string, // Maybe url type?
  project_id: number,
  owner_ids: number[],
  labels: any[],
  owned_by_id: number
}

export interface ProjectSnapshot {
  kind: string, // TODO: enum? I think there is only one...
  date: string,
  current: StorySnapshot[]
}

export interface StorySnapshot {
  kind: string, // TODO: enum? I think there is only one...
  story_id: number,
  story_type: StoryType,
  state: StoryState,
  estimate?: number
}

export interface BurndownDatapoint {
  date: any;
  totalPoints: number;
}

export enum StoryType {
  feature = "feature",
  bug = "bug",
  chore = "chore",
  release = "release"
}

export enum StoryState {
  unstarted = "unstarted",
  started = "started",
  finished = "finished",
  delivered = "delivered",
  accepted = "accepted",
  rejected = "rejected"
}