export interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  activeProposals: number;
  imageUrl: string;
}

export interface Proposal {
  id: string;
  communityId: string;
  title: string;
  description: string;
  deadline: Date;
  votesFor: number;
  votesAgainst: number;
  status: 'active' | 'completed';
}

export interface Vote {
  proposalId: string;
  vote: boolean;
  timestamp: Date;
  transactionHash: string;
}