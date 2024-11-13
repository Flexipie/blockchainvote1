import React, { useState } from 'react';
import { Users, ChevronRight } from 'lucide-react';
import { Community } from '../types';
import LoadingOverlay from './LoadingOverlay';

interface Props {
  community: Community;
  onJoin: (id: string) => Promise<void>;
  isJoined?: boolean;
  onClick?: () => void;
}

export default function CommunityCard({ community, onJoin, isJoined, onClick }: Props) {
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsJoining(true);
    try {
      await onJoin(community.id);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {isJoining && <LoadingOverlay message="Joining community..." />}
      
      <img
        src={community.imageUrl}
        alt={community.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{community.name}</h3>
        <p className="text-gray-600 mb-4">{community.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-500">
            <Users size={20} />
            <span>{community.memberCount} members</span>
          </div>
          {!isJoined && (
            <button
              onClick={handleJoin}
              disabled={isJoining}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Join</span>
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}