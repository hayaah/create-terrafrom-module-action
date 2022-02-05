const axios = require('axios');
const core = require ('@actions/core');

async function run() {
  try {
    const moduleName = core.getInput('module_name');
    const token = core.getInput('token');
    const provider = core.getInput('provider');
    const registryName = core.getInput('registry_name');
    const organization = core.getInput('organization');

 
    const data = {
      "data": {
        "type": "registry-modules",
        "attributes": {
          "name": moduleName,
          "provider": provider,
          "registry-name": registryName
        }
      }
    }
    
    const headers = {
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Bearer ${token}`
    }
    
    const response = await axios.post(`https://app.terraform.io/api/v2/organizations/${organization}/registry-modules`, data, {
      headers: headers
    })

    //const res = await response.json();

    if (response.errors) {
      core.setFailed(response.errors);
    }
    core.setOutput("response", response.data);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
