const hre = require("hardhat");




async function main(){

const buyCoff = await hre.ethers.getContractFactory('buycoffee');
const BC = await buyCoff.deploy()
await BC.deployed();
console.log("Contact Deployed, Address: "+BC.address);


}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});