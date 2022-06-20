# Test ERC-20 Tokens

1. Install dependencies via npm: 

`npm install`

2. Set a private key via: 

`export PRIVATE_KEY=<your-private-key>`

3. Run the following command to deploy a test token. Name and symbol can be passed as arguments and the deployer will automatically receive 1b tokens.

`npx hardhat deploy --name TestToken --symbol TEST --network autobahn-canary`
