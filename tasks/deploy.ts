import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

task("deploy", "Deploys a test token", async (args: any, hre) => {
  const TestToken = await hre.ethers.getContractFactory(
    `Test${args.type.toUpperCase()}`
  );

  const testToken = await TestToken.deploy(args.name, args.symbol);
  await testToken.deployed();

  console.info(`Test ${args.type} deployed at:`);
  console.info(testToken.address);
})
  .addParam("name", "The name of the token")
  .addParam("symbol", "The symbol of the token")
  .addParam("type", "The token type <erc20|erc721|erc1155>");
