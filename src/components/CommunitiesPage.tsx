import React from 'react';
import { Community } from '../types';
import CommunityCard from './CommunityCard';

interface Props {
  communities: Community[];
  onSelectCommunity: (id: string) => void;
}

export default function CommunitiesPage({ communities, onSelectCommunity }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Communities</h1>
        <p className="text-gray-600">Manage and explore your joined communities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map(community => (
          <CommunityCard
            key={community.id}
            community={community}
            isJoined
            onClick={() => onSelectCommunity(community.id)}
          />
        ))}
      </div>

      {communities.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Communities Joined</h3>
          <p className="text-gray-600">Search for communities to join and participate in governance.</p>
        </div>
      )}
    </div>
  );
}