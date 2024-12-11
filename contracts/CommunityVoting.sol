// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CommunityVoting {
    struct Proposal {
        string title;
        uint votesFor;
        uint votesAgainst;
        bool active;
    }

    struct Community {
        string name;
        Proposal proposal;
        mapping(address => bool) members;
    }

    mapping(uint => Community) public communities;
    uint public communityCount;

    constructor() {
        addCommunity("DeFi Governance", "Implement Cross-Chain Bridge");
        addCommunity("NFT Artists Collective", "Adopt New NFT Standard");
        addCommunity("Blockchain Developers", "Create New Development Tools");
    }

    function addCommunity(string memory name, string memory proposalTitle) internal {
        Community storage community = communities[communityCount++];
        community.name = name;
        community.proposal = Proposal(proposalTitle, 0, 0, true);
    }

    function joinCommunity(uint communityId) public {
        require(communityId < communityCount, "Community does not exist");
        communities[communityId].members[msg.sender] = true;
    }

    function vote(uint communityId, bool support) public {
        require(communityId < communityCount, "Community does not exist");
        require(communities[communityId].members[msg.sender], "You must join the community to vote");
        require(communities[communityId].proposal.active, "The proposal is not active");

        if (support) {
            communities[communityId].proposal.votesFor++;
        } else {
            communities[communityId].proposal.votesAgainst++;
        }
    }
}
