define({ "api": [  {    "description": "<p>Deploy the props jurisdiction contract</p>",    "group": "PROPS_Jurisdiction",    "name": "Deploy_Jurisdiction_Contract",    "type": "node",    "url": "scripts/deploy/0-deploy-props-jurisdiction",    "title": "deploy",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "TPLType",            "description": "<p>TPL Type &quot;basic&quot; or &quot;extended&quot; (default Basic)</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "OwnerPrivateKey",            "description": "<p>Private key of Jurisdiction Contract Owner</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "Network",            "description": "<p>Ethereum Network to use (default development)</p>"          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "node scripts/deploy/0-deploy-props-jurisdiction.js basic 02bd8464361b9368457a62753501005d77ca48c1a766bb73a68d02ab3ce1913b rinkeby",          "type": "text"        }      ]    },    "success": {      "examples": [        {          "title": "Success-Output(i.e. participate):",          "content": "deploying basic jurisdiction to development network...\ndeployed by: {\"address\":\"0x60372F979Ab774B3A4BdF7c7d0D0cF8534ef04c6\",\"privateKey\":\"0x02bd8464361b9368457a62753501005d77ca48c1a766bb73a68d02ab3ce1913b\"}\njurisdiction: 0x40bb136E4431296B836d05a53F7dCE851E7a63A7\nmetadata written to build/contractDeploymentAddresses.json\n{\n  \"jurisdictionOwner\": \"0x60372F979Ab774B3A4BdF7c7d0D0cF8534ef04c6\",\n  \"jurisdiction\": \"0x40bb136E4431296B836d05a53F7dCE851E7a63A7\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "scripts/deploy/0-deploy-props-jurisdiction.js",    "groupTitle": "PROPS_Jurisdiction"  },  {    "description": "<p>Setup the props jurisdiction contract</p>",    "group": "PROPS_Jurisdiction",    "name": "SETUP_Jurisdiction_Contract",    "type": "node",    "url": "scripts/deploy/1-setup-props-jurisdiction",    "title": "deploy",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "TPLType",            "description": "<p>TPL Type &quot;basic&quot; or &quot;extended&quot;</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "OwnerPrivateKey",            "description": "<p>Private key of Jurisdiction Contract Owner</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "Validator",            "description": "<p>Ethereum Address</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "Network",            "description": "<p>Ethereum Network to use (default development)</p>"          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "node scripts/deploy/1-setup-props-jurisdiction.js basic 02bd8464361b9368457a62753501005d77ca48c1a766bb73a68d02ab3ce1913b 0xAe9cda73C9B2208eE2edbDb18Ec14E7DF862d592 Validator1 development",          "type": "text"        }      ]    },    "success": {      "examples": [        {          "title": "Success-Output(i.e. participate):",          "content": "setting up basic jurisdiction to development network...\n  jurisdiction: 0xe1efbB0C32e05aaecE934bec5e5c88ae8796Cb5e\nmetadata written to build/contractValidatorsAddresses.json\n{\n  \"validators\": [\n    {\n      \"address\": \"0xAe9cda73C9B2208eE2edbDb18Ec14E7DF862d592\",\n      \"description\": \"Validator1\"\n    },\n    {\n      \"address\": \"0xe64F6fd8663674946E7527e11491e46b140A9890\",\n      \"description\": \"Validator2\"\n    }\n  ]\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "scripts/deploy/1-setup-props-jurisdiction.js",    "groupTitle": "PROPS_Jurisdiction"  }] });
