# openapi-definition
[![NPM version](https://img.shields.io/npm/v/openapi-definition.svg)](https://www.npmjs.com/package/openapi-definition)

Tool to help build/define OpenApi Specification


## Installation

```sh
$ npm install openapi-definition
```

## Usage

### Examples
```js
const openApi = require('openapi-definition');
const {Paths} = openApi;

let openApiDef = {
  "openapi": "3.0.0",
  "info": {
    "title": "Sample API",
    "description": "Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.",
    "version": "0.1.9"
  },
  "servers": [
    {
      "url": "http://api.example.com/v1",
      "description": "Optional server description, e.g. Main (production) server"
    },
    {
      "url": "http://staging-api.example.com",
      "description": "Optional server description, e.g. Internal staging server for testing"
    }
  ],
  "paths": {}
};

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
openApi.add.components_schema(user,'User',openApiDef)

//  Users Path
const users_path = {
  "get": {
    "summary": "Returns a list of users.",
    "description": "Optional extended description in CommonMark or HTML.",
    "responses": {
      "200": {
        "description": "A JSON array of user names",
        "content": {
          "application/json": {
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          }
        }
      }
    }
  }
}

//  Add users path
openApi.add(users_path, Paths.PATHS, '/users', openApiDef)

console.log(openApiDef)
```

#### Output
```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Sample API",
    "description": "Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.",
    "version": "0.1.9"
  },
  "servers": [
    {
      "url": "http://api.example.com/v1",
      "description": "Optional server description, e.g. Main (production) server"
    },
    {
      "url": "http://staging-api.example.com",
      "description": "Optional server description, e.g. Internal staging server for testing"
    }
  ],
  "components": {
    "schemas": {
      "User": {
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
      }
    }
  },
  "paths": {
    "/users": {
      "get": {
        "summary": "Returns a list of users.",
        "description": "Optional extended description in CommonMark or HTML.",
        "responses": {
          "200": {
            "description": "A JSON array of user names",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```


##Docs
### Paths - OpenAPI structure/properties
Used to help update correct OpenApi definition property

```js
//  const openApi = require('openapi-definition');
//  const {Paths} = openApi;

const Paths = {
  OPENAPI: 'openapi',
  info: {
    DESCRIPTION: 'info.description',
    contact: {
      ROOT: 'info.contact',
      NAME: 'info.contact.name',
      URL: 'info.contact.url',
      EMAIL: 'info.contact.email',
    },
    license: {
      ROOT: 'info.license',
      NAME: 'info.license.name',
      URL: 'info.license.url',
    },
    ROOT: 'info',
    TERMS_OF_SERVICE: 'info.termsOfService',
    TITLE: 'info.title',
    VERSION: 'info.version',
  },
  SERVERS: 'servers',
  PATHS: 'paths',
  components: {
    ROOT: 'components',
    SCHEMAS: 'components.schemas',
    PARAMETERS: 'components.parameters',
    SECURITY_SCHEMES: 'components.securitySchemes',
    REQUEST_BODIES: 'components.requestBodies',
    RESPONSES: 'components.responses',
    HEADERS: 'components.headers',
    EXAMPLES: 'components.examples',
    LINKS: 'components.links',
    CALLBACKS: 'components.callbacks',
  },
  SECURITY: 'security',
  TAGS: 'tags',
  externalDocs: {
    ROOT: 'externalDocs',
    DESCRIPTION: 'externalDocs.description',
    URL: 'externalDocs.url',
  },
}
```

###  Functions

```js
const openApi = require('openapi-definition');
const {Paths} = openApi;

let openApiDef = {};      //  Your OpenApi definition

let schemas = {
  schema_1: 'Some data',
  schema_2: 'Some more data',
  schema_3: {description: 'A description', type: 'object'},
};

let dummyJSON = {
  //  Some data
};

let server = { 
  url: 'https://staging.gigantic-server.com/v1', 
  description: 'Staging server'
};

//  Add data to OpenApi definition. Uses `schema_1` as property name
openApi.add.oneOf(schemas.schema_1, Paths.components.SCHEMAS, 'schema_1',  openApiDef);

//  Add data to OpenApi definition. Uses the `object's keys` as property names
openApi.add.manyOf(schemas, Paths.components.SCHEMAS, openApiDef);

//  Add data to OpenApi definition where property is an array
openApi.add.oneOf_to_array(server, Paths.SERVERS, openApiDef);

//  Add callback to OpenApi definition.
openApi.add.components_callback(dummyJSON, openApiDef);

//  Add example to OpenApi definition.
openApi.add.components_example(dummyJSON, openApiDef);

//  Add header to OpenApi definition.
openApi.add.components_header(dummyJSON, openApiDef);

//  Add link to OpenApi definition.
openApi.add.components_link(dummyJSON, openApiDef);

//  Add parameter to OpenApi definition.
openApi.add.components_parameter(dummyJSON, openApiDef);

//  Add requestBody to OpenApi definition.
openApi.add.components_requestBody(dummyJSON, openApiDef);

//  Add response to OpenApi definition.
openApi.add.components_response(dummyJSON, openApiDef);

//  Add schema to OpenApi definition.
openApi.add.components_schema(schemas.schema_1, openApiDef);

//  Add securityScheme to OpenApi definition.
openApi.add.components_securityScheme(dummyJSON, openApiDef);

//  Add path to OpenApi definition.
openApi.add.path(dummyJSON, openApiDef);

//  Add server to OpenApi definition.
openApi.add.server(server, openApiDef);

//  Add security to OpenApi definition.
openApi.add.security(dummyJSON, openApiDef);

//  Add tags to OpenApi definition.
openApi.add.tags(dummyJSON, openApiDef);

//  Sets/overrides path 'externalDocs' in OpenApi definition.
openApi.set.externalDocs(dummyJSON, Paths.components.SCHEMAS, openApiDef);

//  Sets/overrides path 'info' in OpenApi definition.
openApi.set.info(dummyJSON, Paths.components.SCHEMAS, openApiDef);

//  Sets/overrides path 'info_contact' in OpenApi definition.
openApi.set.info_contact(dummyJSON, Paths.components.SCHEMAS, openApiDef);

//  Sets/overrides path 'info_license' in OpenApi definition.
openApi.set.info_license(dummyJSON, Paths.components.SCHEMAS, openApiDef);

//  Sets/overrides path 'openapi' in OpenApi definition.
openApi.set.openapi(dummyJSON, Paths.components.SCHEMAS, openApiDef);

//  Sets/overrides path 'yourOwnPath' in OpenApi definition.
openApi.set.other(dummyJSON, Paths.components.EXAMPLES || 'components.examples', openApiDef);

```


## License

  [MIT](LICENSE)
