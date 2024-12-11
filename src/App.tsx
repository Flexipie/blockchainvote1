import { useState, useEffect } from 'react';
import { Activity, Shield, Menu } from 'lucide-react';
import { Community, Proposal, ToastMessage } from './types';
import Toast from './components/Toast';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import CommunityPage from './components/CommunityPage';
import CommunitiesPage from './components/CommunitiesPage';
import { connectWallet, getContract } from './utils/ethereum';
import { Contract } from 'ethers';

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

function App() {
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [contract, setContract] = useState<Contract | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    async function initializeContract() {
      try {
        const signer = await connectWallet();
        const contractInstance = await getContract(signer);
        setContract(contractInstance);
        setWalletConnected(true);
        addToast('Wallet connected successfully!', 'success');
      } catch (error) {
        console.error('Error initializing contract:', error);
        addToast('Failed to connect wallet. Please try again.', 'error');
      }
    }
    initializeContract();
  }, []);

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, message, type };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const handleJoinCommunity = async (communityId: string) => {
    if (!contract || !walletConnected) {
      addToast('Please connect your wallet first', 'error');
      return;
    }

    try {
      const tx = await contract.joinCommunity(parseInt(communityId));
      await tx.wait();
      addToast('Successfully joined the community!', 'success');
      setJoinedCommunities(prev => [...prev, communityId]);
    } catch (error) {
      console.error('Error joining community:', error);
      addToast('Failed to join community. Please try again.', 'error');
    }
  };

  const handleVote = async (proposalId: string, vote: boolean) => {
    if (!contract || !walletConnected) {
      addToast('Please connect your wallet first', 'error');
      return;
    }

    try {
      const tx = await contract.vote(parseInt(proposalId), vote);
      await tx.wait();
      addToast('Vote submitted successfully!', 'success');
    } catch (error) {
      console.error('Error voting:', error);
      addToast('Failed to submit vote. Please try again.', 'error');
    }
  };

  const filteredCommunities = mockCommunities.filter(community =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCommunitySelect = (communityId: string) => {
    const community = mockCommunities.find(c => c.id === communityId);
    if (community) {
      setSelectedCommunity(community);
    }
  };

  const handleBackToList = () => {
    setSelectedCommunity(null);
  };

  const handleToastClose = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        communities={mockCommunities}
        selectedCommunity={selectedCommunity?.id || null}
        onSelectCommunity={handleCommunitySelect}
        currentPage={selectedCommunity ? 'community' : 'home'}
        onHome={() => setSelectedCommunity(null)}
        onCommunities={() => setSelectedCommunity(null)}
        isOpen={isSidebarOpen}
      />
      <div className={`flex-1 transition-margin duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSelect={handleCommunitySelect}
              communities={filteredCommunities}
            />
            <div className="flex items-center space-x-4">
              <Activity className="h-6 w-6 text-gray-600" />
              <Shield className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          {selectedCommunity ? (
            <CommunityPage
              community={selectedCommunity}
              proposals={[]}
              onVote={handleVote}
              isJoined={joinedCommunities.includes(selectedCommunity.id)}
              onJoin={() => handleJoinCommunity(selectedCommunity.id)}
              onBack={handleBackToList}
            />
          ) : (
            <CommunitiesPage
              communities={filteredCommunities}
              onSelectCommunity={handleCommunitySelect}
            />
          )}
        </main>
      </div>

      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => handleToastClose(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;