import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

// random receiver wallet
const TEST_TRANSFER_RECEIVER = "0x000000000000000000000000000000000000dEaD";

task("deploy", "Deploys a test token", async (args: any, hre) => {
  await hre.run("compile");

  const signers = await hre.ethers.getSigners();

  const TestToken = await hre.ethers.getContractFactory(
    `Test${args.type.toUpperCase()}`
  );

  const testToken = await TestToken.deploy(args.name, args.symbol);
  await testToken.deployed();

  console.info(`Test ${args.type} deployed at:`);
  console.info(testToken.address);

  console.info(`Now running some test transfers`);

  let tx;
  switch (args.type) {
    case "erc20":
      tx = (
        await testToken.transfer(
          TEST_TRANSFER_RECEIVER,
          hre.ethers.utils.parseEther("100")
        )
      ).wait();
      break;
    case "erc721":
      tx = (
        await testToken.transferFrom(
          signers[0].address,
          TEST_TRANSFER_RECEIVER,
          1
        )
      ).wait();
      break;
    case "erc1155":
      tx = (
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
  console.info(`Test tx done with hash ${tx.hash}`);

  try {
    await hre.run("verify:verify", {
      address: testToken.address,
      constructorArguments: [args.name, args.symbol],
    });
  } catch (err) {
    console.info(`Contract verification failed`, err);
    console.error(err);
  }
})
  .addParam("name", "The name of the token")
  .addParam("symbol", "The symbol of the token")
  .addParam("type", "The token type <erc20|erc721|erc1155>");
