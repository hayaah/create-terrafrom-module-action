import fetch from 'node-fetch';
import * as core from '@actions/core';

async function run() {
  try {
    const moduleName = core.getInput('module_name');
    const token = core.getInput('token');
    const provider = core.getInput('provider');
    const registryName = core.getInput('registry_name');
    const organization = core.getInput('organization');
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

    core.setOutput("body", body);
    core.setOutput("url", `https://app.terraform.io/api/v2/organizations/${organization}/registry-modules`);
    const response = await fetch(
      `https://app.terraform.io/api/v2/organizations/${organization}/registry-modules`, 
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/vnd.api+json', Authorization: `Bearer ${token}`}
      });
  
    const res = await response.json();
    if (res.errors) {
      core.setFailed(res.errors);
    }
    core.setOutput("response", res.data);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
