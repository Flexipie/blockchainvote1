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
  status: 'active' | 'closed';
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error';
}

export interface BlockchainCommunity {
  name: string;
  proposal: BlockchainProposal;
}

export interface BlockchainProposal {
  title: string;
  votesFor: number;
  votesAgainst: number;
  active: boolean;
}

export interface Vote {
  proposalId: string;
  vote: boolean;
  timestamp: Date;
  transactionHash: string;
}