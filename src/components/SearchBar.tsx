import React from 'react';
import { Search } from 'lucide-react';
import { Community } from '../types';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSelect: (communityId: string) => void;
  communities: Community[];
}

export default function SearchBar({ value, onChange, onSelect, communities }: Props) {
  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search communities..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      
      {value && communities.length > 0 && (
        <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
          {communities.map(community => (
            <button
              key={community.id}
              onClick={() => onSelect(community.id)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
            >
              <img
                src={community.imageUrl}
                alt={community.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{community.name}</p>
                <p className="text-sm text-gray-500">{community.memberCount} members</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}