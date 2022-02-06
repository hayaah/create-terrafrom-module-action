const axios = require('axios');

const mockedUrl = "https://app.terraform.io/api/v2/organizations/infragod-test/registry-modules"

const mockedSuccessRes = {
  "data":
  {
    "id": "mod-NeV9qPYFVpGLTJvZ",
    "type": "registry-modules",
    "attributes":
    {
      "name": "module-Name-100",
      "namespace": "wix-infragod",
      "provider": "aws",
      "status": "pending",
      "version-statuses": [],
      "created-at": "2022-02-06T04:03:00.646Z",
      "updated-at": "2022-02-06T04:03:00.646Z",
      "registry-name": "private",
      "permissions": { "can-delete": true, "can-resync": true, "can-retry": true }
    },
    "relationships": {
      "organization":
        { "data": { "id": "wix-infragod", "type": "organizations" } }
    },
    "links": {
      "self": ""
    }
  }
}

const mockedFailerRes = {
  "errors": [
      "Not found"
  ],
  "success": false
}

jest.mock("axios");

const setInput = (name, value) =>
process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] = value;

test('test calling create module function', async () => {

  setInput("module_name", "module_name")
  setInput("token", "token")
  setInput("provider", "aws")
  setInput("registry_name", "private")
  setInput("organization", "infragod-test")

  await axios.post.mockImplementation((url) => {
    if (url == mockedUrl) {
      return Promise.resolve(mockedSuccessRes)
    }
  });
  // must be here to triger the api call
  const createModule = require('../lib/index');
});

test('test calling create module function with missing organazation', async () => {
  setInput("module_name", "module_name")
  setInput("token", "token")
  setInput("provider", "aws")
  setInput("registry_name", "private")
  await axios.post.mockImplementation(() => {
    return Promise.reject(mockedFailerRes)
  });
});
