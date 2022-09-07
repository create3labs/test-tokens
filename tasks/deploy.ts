import { task, types } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

// random receiver wallet
const TEST_TRANSFER_RECEIVER = "0x000000000000000000000000000000000000dEaD";

task("deploy", "Deploys a test token", async (args: any, hre) => {
  await hre.run("compile");

  const signers = await hre.ethers.getSigners();

  const TestToken = await hre.ethers.getContractFactory(
    `Test${args.type.toUpperCase()}`
  );

  let constructorArgs = [args.name, args.symbol];
  if (args.type === "erc721" || args.type === "erc721a") {
    constructorArgs.push(args.publicMintEnabled);
    constructorArgs.push(args.baseUri);
  }

  console.log(constructorArgs);
  const testToken = await TestToken.deploy(...constructorArgs);
  await testToken.deployed();

  console.info(`Test ${args.type} deployed at:`);
  console.info(testToken.address);

  console.info(`Now running some test transfers`);
  let tx;
  switch (args.type) {
    case "erc20":
      tx = await (
        await testToken.transfer(
          TEST_TRANSFER_RECEIVER,
          hre.ethers.utils.parseEther("100")
        )
      ).wait();
      break;
    case "erc721a":
    case "erc721":
      tx = await (
        await testToken.transferFrom(
          signers[0].address,
          TEST_TRANSFER_RECEIVER,
          1
        )
      ).wait();
      break;
    case "erc1155":
      tx = await (
        await testToken.safeTransferFrom(
          signers[0].address,
          TEST_TRANSFER_RECEIVER,
          1,
          1,
          "0x"
        )
      ).wait();
      break;
  }
  console.info(`Test tx done with hash ${tx.transactionHash}`);

  if (hre.network.name !== "hardhat") {
    try {
      await hre.run("verify:verify", {
        address: testToken.address,
        constructorArguments: constructorArgs,
      });
    } catch (err) {
      console.info(`Contract verification failed`, err);
      console.error(err);
    }
  }
})
  .addParam("name", "The name of the token")
  .addParam("symbol", "The symbol of the token")
  .addParam("type", "The token type <erc20|erc721|erc1155>")
  .addOptionalParam(
    "publicMintEnabled",
    "For NFTs: Set true if mint should be public",
    false,
    types.boolean
  )
  .addOptionalParam(
    "baseUri",
    "For NFTs: Set a URI ending with /",
    "",
    types.string
  );
