# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
```
Pour tester en locale:
    1.Installer package.json: npm install package.json
    2.npx hardhat node On démarre la blockchain 
    3.npx hardhat run scripts/deploy.js --network localhost On déploie le contrat
    4.npm start On démarre le front # WalletEthereum
    Si dans la cnosole JS vous avez une erreur "MetaMask - RPC Error Nonce too high", 
    dans metamask aller dans les paramétres puis paramétres avancées et reinitialiser le compte.

    Attention dans VS Code utilisez l'extension solidity version 0.0.135
```
