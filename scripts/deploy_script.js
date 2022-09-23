// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion wathrough `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
//returns the eth balance of an address
async function getBalance(address) {
    const balance =  await hre.ethers.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balance);
}
//print balances of addresses to console
async function printbal(addresses) {
    let idx= 0;
    for (const address of addresses){
        console.log('${idx} balance: ', await getBalance(address));
    }
}
async function printMemos(memos) {

for(const memo of memos){
    const Name = memo.name;
    const Message  = memo.message;
}
    console.log(Name+" "+Message);
}






async function main() {
  //get example accounts
  const [owner, tipper, tipper2] = await hre.ethers.getSigners();

  //get contract to deploy
const toDeploy = await hre.ethers.getContractFactory("buycoffee")
//deploy contract
const todeploy = await toDeploy.deploy()
 await todeploy.deployed();
 console.log("Deployed to: "+todeploy.address);

 //get balances of addresses
 const AllAddresses =[owner.address,tipper.address, todeploy.address];
 console.log("===start of contract===")
 await printbal(AllAddresses);

//buy coffees
const tip ={value: hre.ethers.utils.parseEther("1")};
//connect to tipper account and activate buycoffee from sol file
await todeploy.connect(tipper).buyCoffee("Ibrahim", "Awesome work",tip);
await todeploy.connect(tipper2).buyCoffee("Ibra", " work",tip);
await printbal(AllAddresses);

await todeploy.connect(owner).withdrawCoffee()
await printbal(AllAddresses);

//print out memos
console.log("===memos===");
const memos = todeploy.getMemos();
printMemos(memos);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
