export interface Negotiation {
  negotiationId: number;
  employer: string;
  candidate: string;
  title: string;
  state: number;
  createdAt: number;
  deadline: number;
  hasMatchResult: boolean;
  matchRevealed: boolean;
  meetingPoint: number;
  // Add these for state 3 (MATCH_READY):
  hasMatchHandle?: string;
  meetingPointHandle?: string;
}

export enum NegotiationState {
  NOT_STARTED = 0,
  EMPLOYER_SUBMITTED = 1,
  CANDIDATE_SUBMITTED = 2,
  MATCH_READY = 3,
  COMPLETED = 4
}

export const STATE_NAMES: { [key: number]: string } = {
  0: 'Not Started',
  1: 'Employer Submitted',
  2: 'Candidate Submitted',
  3: 'Match Ready',
  4: 'Completed'
};