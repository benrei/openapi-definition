const openApi = require('../index');
const { OpenApi } = openApi;
let yourOpenApi = require('./definition');

//  Add User Schema
let user = {
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64"
    },
    "name": {
      "type": "string"
    }
  }
};
openApi.add.components_schema(yourOpenApi, 'User', user);

console.log(JSON.stringify(yourOpenApi, "", 2));