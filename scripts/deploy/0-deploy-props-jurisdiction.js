/**
 * @apiDescription Deploy the props jurisdiction contract with the KYC attribuetId
 * @apiGroup PROPS Jurisdiction
 * @apiName Deploy Jurisdiction Contract 
 * @api {node} scripts/deploy/0-deploy-props-jurisdiction deploy
 * @apiParam {String} TPLType TPL Type "basic" or "extended" (default Basic)
 * @apiParam {String} OwnerPrivateKey Private key of Jurisdiction Contract Owner
 * @apiParam {String} Network Ethereum Network to use (default development)
 * @apiParamExample {text} Request-Example:
 *     node scripts/deploy/0-deploy-props-jurisdiction.js basic 02bd8464361b9368457a62753501005d77ca48c1a766bb73a68d02ab3ce1913b rinkeby 
 
 * 
 *
 * @apiSuccessExample {json} Success-Output(i.e. participate):
 *    deploying basic jurisdiction to development network...
 *    deployed by: {"address":"0x60372F979Ab774B3A4BdF7c7d0D0cF8534ef04c6","privateKey":"0x02bd8464361b9368457a62753501005d77ca48c1a766bb73a68d02ab3ce1913b"}
 *    jurisdiction: 0x40bb136E4431296B836d05a53F7dCE851E7a63A7
 *    metadata written to build/contractDeploymentAddresses.json
 *    {
 *      "jurisdictionOwner": "0x60372F979Ab774B3A4BdF7c7d0D0cF8534ef04c6",
 *      "jurisdiction": "0x40bb136E4431296B836d05a53F7dCE851E7a63A7"
 *    }
 *
*/
var fs = require('fs');
const applicationConfig = require('../../config.js')
const connectionConfig = require('../../truffle.js')
const attributeId = 1;
const attributeDescription = 'Wallet has been KYCed'

let networkName = process.argv[4] // Provide if you'd like to dump accounts
if (typeof(networkName) === 'undefined') {
  networkName = 'development';
}
console.log("networkName="+networkName);
const connection = connectionConfig.networks[applicationConfig.networks[networkName].network]
var ownerAccount;
const deployMetadataFilename = 'build/contractDeploymentAddresses-'+networkName+'.json'

let deployAddresses
try {
  deployAddresses = require(`../../${deployMetadataFilename}`)
} catch(error) {
  deployAddresses = {}
}

let deployType = process.argv[2] // Provide Basic or Extended jurisdiction type
if (typeof(deployType) === 'undefined') {
  deployType = 'extended'
} else {
  deployType = deployType.toLowerCase()
}

let pk = process.argv[3] // Provide if you'd like to dump accounts
if (typeof(pk) === 'undefined') {
  console.error('must supply private key of jurisdiction account owner')
  process.exit(1)
}

const deployTypeOptions = new Set(['basic', 'extended'])
if (!deployTypeOptions.has(deployType)) {
  console.error('must supply "Basic" or "Extended" as the target!')
  process.exit(1)
}

args = []

let contractImportLocation
if (deployType === 'basic') {
  contractImportLocation = '../../build/contracts/BasicJurisdiction.json'
} else if (deployType === 'extended') {
  contractImportLocation = '../../build/contracts/ExtendedJurisdiction.json'
}

const ContractData = require(contractImportLocation)

let web3 = connection.provider

const Contract = new web3.eth.Contract(ContractData.abi)

async function main() {
  console.log(
    `deploying ${
      deployType
    } jurisdiction to ${
      applicationConfig.networks[networkName].network
    } network...`
  )
  
  ownerAccount = web3.eth.accounts.privateKeyToAccount('0x'+pk);  
  
  
  const account = ownerAccount;
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;  
  deployAddresses.jurisdictionOwner = account.address
  console.log(`   deployed by: ${JSON.stringify(account)}`)

  const ContractInstance = await Contract.deploy({
    data: ContractData.bytecode,
    arguments: args
  }).send({
    from: account.address,
    gas: 6000000,
    gasPrice: '10000000000'
  })

  const deployedAddress = ContractInstance.options.address
  deployAddresses.jurisdiction = deployedAddress
  console.log(`  jurisdiction: ${deployedAddress}`)

  //add the kyc attribute
  await ContractInstance.methods.addAttributeType(
    attributeId,
    attributeDescription,
  ).send({
    from: account.address,
    gas: 6000000,
    gasPrice: 10 ** 9
  }).then((receipt) => {
    deployAddresses.attributeId = attributeId;
    deployAddresses.attributeDescription = attributeDescription;
    deployAddresses.addAttributeReceipt = receipt    
  }).catch(error => {
    console.log(error);    
  })

  fs.writeFile(
    deployMetadataFilename,
    JSON.stringify(deployAddresses),
    {flag: 'w'},
    err => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`metadata written to ${deployMetadataFilename}`)
      console.log(JSON.stringify(deployAddresses, null, 2))      
      process.exit(0)
    }
  )
}

main()
