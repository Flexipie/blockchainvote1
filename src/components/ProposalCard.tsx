import React, { useState } from 'react';
import { Check, X, Clock } from 'lucide-react';
import { Proposal } from '../types';
import LoadingOverlay from './LoadingOverlay';

interface Props {
  proposal: Proposal;
  onVote: (proposalId: string, vote: boolean) => Promise<void>;
}

export default function ProposalCard({ proposal, onVote }: Props) {
  const [isVoting, setIsVoting] = useState(false);
  const totalVotes = proposal.votesFor + proposal.votesAgainst;
  const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;

  const handleVote = async (vote: boolean) => {
    setIsVoting(true);
    try {
      await onVote(proposal.id, vote);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="relative bg-white rounded-xl shadow-lg p-6">
      {isVoting && <LoadingOverlay message="Confirming vote on blockchain..." />}
      
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{proposal.title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm ${
          proposal.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {proposal.status}
        </span>
      </div>
      <p className="text-gray-600 mb-6">{proposal.description}</p>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{forPercentage.toFixed(1)}% For</span>
          <span>{(100 - forPercentage).toFixed(1)}% Against</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${forPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-500">
          <Clock size={16} />
          <span className="text-sm">
            Ends {new Date(proposal.deadline).toLocaleDateString()}
          </span>
        </div>
        
        {proposal.status === 'active' && (
          <div className="flex space-x-3">
            <button
              onClick={() => handleVote(true)}
              disabled={isVoting}
              className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check size={16} />
              <span>For</span>
            </button>
            <button
              onClick={() => handleVote(false)}
              disabled={isVoting}
              className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X size={16} />
              <span>Against</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}