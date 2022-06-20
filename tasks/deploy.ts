import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

task("deploy", "Deploys a test token", async (args, hre) => {
  const TestToken = await hre.ethers.getContractFactory("TestToken");
  // @ts-ignore
  const testToken = await TestToken.deploy(args.name, args.symbol);
  await testToken.deployed();
  console.info(`Test token deployed at:`);
  console.info(testToken.address);
}).addParam('name', 'The name of the token').addParam('symbol', 'The symbol of the token');
