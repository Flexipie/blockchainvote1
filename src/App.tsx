import React, { useState } from 'react';
import { Activity, Shield, Search, User, Home, Users, Menu } from 'lucide-react';
import { Community, Proposal } from './types';
import CommunityCard from './components/CommunityCard';
import ProposalCard from './components/ProposalCard';
import Toast from './components/Toast';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import CommunityPage from './components/CommunityPage';
import CommunitiesPage from './components/CommunitiesPage';

// Mock data remains the same
const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'DeFi Governance',
    description: 'Community focused on decentralized finance governance decisions',
    memberCount: 1420,
    activeProposals: 3,
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832',
  },
  {
    id: '2',
    name: 'NFT Artists Collective',
    description: 'Digital artists collaborating on NFT standards and initiatives',
    memberCount: 892,
    activeProposals: 2,
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=2832',
  },
];

const mockProposals: Proposal[] = [
  {
    id: '1',
    communityId: '1',
    title: 'Implement Cross-Chain Bridge',
    description: 'Proposal to implement a secure bridge between Ethereum and Solana for token transfers',
    deadline: new Date('2024-04-01'),
    votesFor: 850,
    votesAgainst: 234,
    status: 'active',
  },
  {
    id: '2',
    communityId: '1',
    title: 'Treasury Allocation Q2 2024',
    description: 'Proposal for allocating community treasury funds for Q2 2024 development initiatives',
    deadline: new Date('2024-03-25'),
    votesFor: 1200,
    votesAgainst: 150,
    status: 'active',
  },
];

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error';
}

type Page = 'home' | 'communities' | 'community';

function App() {
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>([]);
  const [votes, setVotes] = useState<Record<string, boolean>>({});
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleJoinCommunity = async (communityId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    setJoinedCommunities(prev => [...prev, communityId]);
    addToast('Successfully joined community!', 'success');
  };

  const handleVote = async (proposalId: string, vote: boolean) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    setVotes(prev => ({ ...prev, [proposalId]: vote }));
    addToast('Vote successfully recorded on the blockchain!', 'success');
  };

  const filteredCommunities = mockCommunities.filter(community =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavigate = (page: Page, communityId?: string) => {
    setCurrentPage(page);
    if (page === 'community' && communityId) {
      setSelectedCommunity(communityId);
    } else if (page !== 'community') {
      setSelectedCommunity(null);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'communities':
        return (
          <CommunitiesPage
            communities={mockCommunities.filter(c => joinedCommunities.includes(c.id))}
            onSelectCommunity={(id) => handleNavigate('community', id)}
          />
        );
      case 'community':
        if (selectedCommunity) {
          const community = mockCommunities.find(c => c.id === selectedCommunity);
          const communityProposals = mockProposals.filter(p => p.communityId === selectedCommunity);
          return (
            <CommunityPage
              community={community!}
              proposals={communityProposals}
              onVote={handleVote}
            />
          );
        }
        return null;
      default:
        return (
          <>
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Communities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockCommunities
                  .filter(community => joinedCommunities.includes(community.id))
                  .map(community => (
                    <CommunityCard
                      key={community.id}
                      community={community}
                      onJoin={handleJoinCommunity}
                      isJoined
                      onClick={() => handleNavigate('community', community.id)}
                    />
                  ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Active Proposals</h2>
              <div className="grid grid-cols-1 gap-6">
                {mockProposals.map(proposal => (
                  <ProposalCard
                    key={proposal.id}
                    proposal={proposal}
                    onVote={handleVote}
                  />
                ))}
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              <Shield className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">BlockVote</span>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onSelect={(communityId) => {
                  handleNavigate('community', communityId);
                  setSearchQuery('');
                }}
                communities={filteredCommunities}
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Activity className="h-5 w-5 text-gray-500" />
                <span className="ml-2 text-sm text-gray-500">Connected</span>
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <User className="h-6 w-6 text-gray-600" />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        <Sidebar
          communities={mockCommunities.filter(c => joinedCommunities.includes(c.id))}
          selectedCommunity={selectedCommunity}
          onSelectCommunity={(id) => handleNavigate('community', id)}
          onHome={() => handleNavigate('home')}
          onCommunities={() => handleNavigate('communities')}
          currentPage={currentPage}
          isOpen={isSidebarOpen}
        />
        
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </div>
        </main>
      </div>

      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

export default App;