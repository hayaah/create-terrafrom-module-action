import fetch from 'node-fetch';
import * as core from '@actions/core';

async function run() {
  try {
    const moduleName = core.getInput('moduleName');
    const token = core.getInput('token');
    const provider = core.getInput('provider');
    const registryName = core.getInput('registryName');
    const organization = core.getInput('organizations');
    const body = {
      "data": {
        "type": "registry-modules",
        "attributes": {
          "name": moduleName,
          "provider": provider,
          "registry-name": registryName
        }
      }
    }
    const response = await fetch(
      `https://app.terraform.io/api/v2/organizations/${organization}/registry-modules`, 
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/vnd.api+json', Authorization: `Bearer ${token}`}
      });
  
    const data = await response.json();
    core.setOutput("res", data);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
