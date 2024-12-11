import { ethers } from "hardhat";

async function main() {
  const CommunityVoting = await ethers.getContractFactory("CommunityVoting");
  const communityVoting = await CommunityVoting.deploy();
  await communityVoting.deployed();

  console.log("CommunityVoting deployed to:", communityVoting.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
