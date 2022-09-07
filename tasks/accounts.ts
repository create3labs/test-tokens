import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

task("accounts", "Prints all available accounts", async (args: any, hre) => {
  const signers = await hre.ethers.getSigners();
  for (const signer of signers) {
    console.info(`${signer.address}`);
  }
});
