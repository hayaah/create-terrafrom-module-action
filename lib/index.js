const core = require('@actions/core');
const createModule = require('./createModule')

async function run() {
  try {
  
    const response = createModule.modules.createModuleApiCall()

    if (response.data) {
      core.setOutput("response", JSON.stringify(response.data));
    }
  }
  catch (error) {
    if (error.response) { 
      core.setFailed({ status: error.response.status, data: error.response.data });
    }
  }
}

run()