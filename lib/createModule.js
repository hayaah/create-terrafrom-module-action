const axios = require('axios');
const core = require('@actions/core');

const getParams = () => {
  const moduleName = core.getInput('module_name');
  const provider = core.getInput('provider');
  const registryName = core.getInput('registry_name');
  const organization = core.getInput('organization');

  return {
    moduleName,
    provider,
    registryName,
    organization
  }
}

const getToken = () => {
  return core.getInput('token')
}

const createModuleApiCall = async () => {
  const params =  getParams()
  const { moduleName, provider, registryName, organization } = params
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
    'Authorization': `Bearer ${getToken()}`
  }

  const response = await axios.post(`https://app.terraform.io/api/v2/organizations/${organization}/registry-modules`, data, {
    headers: headers
  })

  return response
}

exports.modules = {
  createModuleApiCall,
  getParams
}