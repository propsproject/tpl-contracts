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
      provider: new Web3('ws://localhost:8545'),      
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
