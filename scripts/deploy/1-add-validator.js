/**
 * @apiDescription Add Validator to the props jurisdiction contract
 * @apiGroup PROPS Jurisdiction
 * @apiName Add Validator to Jurisdiction Contract 
 * @api {node} scripts/deploy/1-add-validator.js add_validator
 * @apiParam {String} TPLType TPL Type "basic" or "extended"
 * @apiParam {String} OwnerPrivateKey Private key of Jurisdiction Contract Owner
 * @apiParam {String} Address Validator Ethereum Address
 * @apiParam {String} Description Validator Description (default "Validator")
 * @apiParam {String} Network Ethereum Network to use (default development)
 * @apiParamExample {text} Request-Example:
 *     node scripts/deploy/1-add-validator.js basic 02bd8464361b9368457a62753501005d77ca48c1a766bb73a68d02ab3ce1913b 0xAe9cda73C9B2208eE2edbDb18Ec14E7DF862d592 Validator1 development
 * 
 *
 * @apiSuccessExample {json} Success-Output(i.e. participate):
 * setting up basic jurisdiction to development network...
  jurisdiction: 0xe1efbB0C32e05aaecE934bec5e5c88ae8796Cb5e
metadata written to build/contractValidatorsAddresses.json
{
  "validators": [
    {
      "address": "0xAe9cda73C9B2208eE2edbDb18Ec14E7DF862d592",
      "description": "Validator1"
    },
    {
      "address": "0xe64F6fd8663674946E7527e11491e46b140A9890",
      "description": "Validator2"
    }
  ]
}
*/
var fs = require('fs');
const applicationConfig = require('../../config.js')
const connectionConfig = require('../../truffle.js')

let validatorAddress = process.argv[4];
let validatorDescription = process.argv[5];
if (typeof(validatorAddress) === 'undefined') {
  console.error('must supply validator address to add')
  process.exit(1)
}

if (typeof(validatorDescription) === 'undefined') {
  validatorDescription = 'Validator'
}

let networkName = process.argv[6]; // Provide if you'd like to dump accounts
if (typeof(networkName) === 'undefined') {
  networkName = 'development';
}
console.log("networkName="+networkName);
const connection = connectionConfig.networks[applicationConfig.networks[networkName].network]
var ownerAccount;
const deployMetadataFilename = 'build/contractDeploymentAddresses.json'
const validatorsMetadataFilename = 'build/contractValidatorsAddresses.json'

let deployAddresses;
let validatorAddresses;
try {
  deployAddresses = require(`../../${deployMetadataFilename}`)  
} catch(error) {
  deployAddresses = {}  
}

try {
  validatorAddresses = require(`../../${validatorsMetadataFilename}`)
} catch(error) {
  validatorAddresses = {}
}

let deployType = process.argv[2] // Provide Basic or Extended jurisdiction type
if (typeof(deployType) === 'undefined') {
  console.error('must supply contract type')
  process.exit(1)
} else {
  deployType = deployType.toLowerCase()
}

let pk = process.argv[3] // Provide if you'd like to dump accounts
if (typeof(pk) === 'undefined') {
  console.error('must supply private key of jurisdiction account owner')
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
const ContractInstance = new web3.eth.Contract(ContractData.abi, deployAddresses.jurisdiction)

async function main() {
  console.log(
    `setting up ${
      deployType
    } jurisdiction to ${
      applicationConfig.networks[networkName].network
    } network...`
  )
  
  ownerAccount = web3.eth.accounts.privateKeyToAccount('0x'+pk);  
  
  
  const account = ownerAccount;
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;  
    
  await ContractInstance.methods.addValidator(
    validatorAddress,
    validatorDescription,
  ).send({
    from: account.address,
    gas: 6000000,
    gasPrice: 10 ** 9
  }).catch(error => {
    console.log(error);    
  })
  
  if (typeof(validatorAddresses.validators)==='undefined'){   
    validatorAddresses.validators = [];    
  }
  validatorAddresses.validators.push({'address': validatorAddress, 'description': validatorDescription});
  
  const deployedAddress = ContractInstance.options.address
  deployAddresses.jurisdiction = deployedAddress
  console.log(`  jurisdiction: ${deployedAddress}`)

  fs.writeFile(
    validatorsMetadataFilename,
    JSON.stringify(validatorAddresses),
    {flag: 'w'},
    err => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`metadata written to ${validatorsMetadataFilename}`)
      console.log(JSON.stringify(validatorAddresses, null, 2))      
      process.exit(0)
    }
  )
}

main()
