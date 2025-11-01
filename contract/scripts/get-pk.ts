// scripts/get-pk.ts
import { ethers } from "ethers";

async function main() {
  // Hardhat’s default mnemonic
  const mnemonic = "test test test test test test test test test test test junk";

  // Derive the first account (index 0)
  const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic).derivePath("m/44'/60'/0'/0/0");

  console.log("Account #0");
  console.log("Address      :", wallet.address);
  console.log("Private Key  :", wallet.privateKey);
}

main().catch(console.error);