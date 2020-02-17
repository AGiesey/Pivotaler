export interface StorySummaryModel {
  id: number;
  title: string;
  storyType: storyTypes;
  estimate: number;
  currentState: storyStates;
  ownerIds: number[];
}

export interface StoryDetailsModel extends StorySummaryModel{
  projectId: number;
  description: string;
  acceptedAt: Date | null;
  taskIds: number[];
  blockerIds: number[];
  commentIds: number[];
  createdAt: Date;
  updatedAt: Date;
  url: string;
  blockedStoryIds: number[];
  kind: string;
}

export enum storyTypes {
  bug = "bug",
  feature = "feature",
  chore = "chore",
  release = "release"
}

export enum storyStates {
  unstarted = "unstarted",
  started = "started",
  finished = "finished",
  delivered = "delivered",
  rejected = "rejected",
  accepted = "accepted"
}