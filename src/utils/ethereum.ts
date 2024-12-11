import { ethers, BrowserProvider, Contract } from 'ethers';
import { CommunityVotingABI } from '../contracts/CommunityVoting';

declare global {
    interface Window {
        ethereum: any;
    }
}

export async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new BrowserProvider(window.ethereum);
            const signer = provider.getSigner();
            return signer;
        } catch (error) {
            console.error('User rejected connection:', error);
            throw error;
        }
    } else {
        throw new Error('Please install MetaMask!');
    }
}

export async function getContract(signer: ethers.Signer) {
    // Replace with your deployed contract address
    const contractAddress = '0xA16F349f2ee6b6C3E57105dc79b246bB2D8165F7';
    return new Contract(
        contractAddress,
        CommunityVotingABI,
        signer
    );
}

export async function joinCommunity(contract: ethers.Contract, communityId: number) {
    try {
        const tx = await contract.joinCommunity(communityId);
        await tx.wait();
        return true;
    } catch (error) {
        console.error('Error joining community:', error);
        throw error;
    }
}

export async function vote(contract: ethers.Contract, communityId: number, support: boolean) {
    try {
        const tx = await contract.vote(communityId, support);
        await tx.wait();
        return true;
    } catch (error) {
        console.error('Error voting:', error);
        throw error;
    }
}
