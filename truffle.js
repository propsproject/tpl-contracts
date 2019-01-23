const PrivateKeyProvider = require("truffle-privatekey-provider");
var Web3 = require('web3')

module.exports = {
  networks: {
    development: {
      provider: new Web3('ws://localhost:9545'),
      network_id: "*", // Match any network id
      gasPrice: 2 *(10 ** 9),
      gas: 8000000
    },
    rinkeby: {
      provider: new Web3('http://127.0.0.1:8545'),      
      network_id: "*",
      gasPrice: 1 *(10 ** 9),
      gas: 8000000 
    }, 
    infurarinkeby: {
      provider: new Web3(new PrivateKeyProvider(typeof(process.env['SENDER_PK'])==='undefined' ? process.argv[3] : process.env['SENDER_PK'], 'https://rinkeby.infura.io/v3/bc1b11176a1e4aa98b607fea38eb4d43')),
      network_id: "*",
      gasPrice: 1 *(10 ** 9),
      gas: 8000000 
    }, 
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  }
}
