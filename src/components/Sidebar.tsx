import React from 'react';
import { Home, Users } from 'lucide-react';
import { Community } from '../types';

interface Props {
  communities: Community[];
  selectedCommunity: string | null;
  onSelectCommunity: (id: string) => void;
  onHome: () => void;
  onCommunities: () => void;
  currentPage: 'home' | 'communities' | 'community';
  isOpen: boolean;
}

export default function Sidebar({
  communities,
  selectedCommunity,
  onSelectCommunity,
  onHome,
  onCommunities,
  currentPage,
  isOpen
}: Props) {
  return (
    <div 
      className={`fixed h-full bg-white shadow-lg transition-all duration-300 ${
        isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'
      }`}
      style={{ top: '4rem', zIndex: 50 }}
    >
      <div className="p-4">
        <div className="space-y-1">
          <button
            onClick={onHome}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentPage === 'home' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Home size={20} />
            <span>Home</span>
          </button>

          <button
            onClick={onCommunities}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentPage === 'communities' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Users size={20} />
            <span>Communities</span>
          </button>
        </div>
        
        {currentPage !== 'communities' && communities.length > 0 && (
          <div className="mt-8">
            <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Your Communities
            </h3>
            <div className="mt-4 space-y-1">
              {communities.map(community => (
                <button
                  key={community.id}
                  onClick={() => onSelectCommunity(community.id)}
                  className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    selectedCommunity === community.id && currentPage === 'community'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Users size={20} />
                  <span>{community.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}