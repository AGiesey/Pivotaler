export interface StorySummaryModel {
  title: string;
  storyType: storyTypes;
  estimate: number;
  currentState: storyStates;
  ownerIds: number[];
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