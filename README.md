# Test Tokens

1. Install dependencies via npm:

`npm install`

2. Set a private key via:

`export PRIVATE_KEY=<your-private-key>`

3. Run the following command to deploy a test token. Name, symbol and type can be passed as arguments and the deployer will automatically receive some tokens.

`npx hardhat deploy --name TestToken --symbol TEST --type erc20 --network autobahn-canary`

Type can be one of:

- `erc20`
- `erc721`
- `erc1155`
