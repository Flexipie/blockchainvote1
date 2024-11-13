import React from 'react';
import { Users, ChevronRight } from 'lucide-react';
import { Community, Proposal } from '../types';
import ProposalCard from './ProposalCard';

interface Props {
  community: Community;
  proposals: Proposal[];
  onVote: (proposalId: string, vote: boolean) => Promise<void>;
}

export default function CommunityPage({ community, proposals, onVote }: Props) {
  return (
    <div className="space-y-8">
      <div className="relative h-64 rounded-xl overflow-hidden">
        <img
          src={community.imageUrl}
          alt={community.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-4xl font-bold text-white mb-2">{community.name}</h1>
          <div className="flex items-center text-white/90">
            <Users size={20} />
            <span className="ml-2">{community.memberCount} members</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
        <p className="text-gray-600">{community.description}</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Proposals</h2>
        <div className="space-y-6">
          {proposals.map(proposal => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              onVote={onVote}
            />
          ))}
        </div>
      </div>
    </div>
  );
}