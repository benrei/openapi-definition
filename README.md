# openapi-definition
[![NPM version](https://img.shields.io/npm/v/openapi-definition.svg)](https://www.npmjs.com/package/openapi-definition)

Tool to help build/define OpenAPI Specification


## Installation

```sh
$ npm install openapi-definition
```

## Usage
This is how to build your OpenAPI Specification by using `openapi-definition`

#### OpenAPI Specification Sample
```js
let yourOpenApi = {
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
    }
  ],
  "paths": {}
};
```

### Example - Add `User` Schema to OpenAPI Specification
```js
const openApi = require('openapi-definition');
const {Paths} = openApi;
let yourOpenApi = {...};

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
openApi.add.components_schema(user,'User',yourOpenApi)

console.log(yourOpenApi)
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
  }
}
```

### Example - Add path `/users` to OpenAPI Specification
```js
const openApi = require('openapi-definition');
const {Paths} = openApi;
let yourOpenApi = {...};

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

openApi.add.path(users_path, '/users', yourOpenApi);
//  or
openApi.add.oneOf(users_path, Paths.PATHS, '/users', yourOpenApi);

console.log(yourOpenApi)
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
    }
  ],
  "components": {},
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
### Paths - OpenAPI document fields
All OpenAPI fields. Holds all object `paths` to the OpenAPI root document.

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

let openApiDef = {};      //  Your OpenAPI definition

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

//  Add Schema schemas.schema_1 to OpenAPI definition. Uses `schema_1` as property name
openApi.add.oneOf(schemas.schema_1, Paths.components.SCHEMAS, 'schema_1',  openApiDef);

//  Add `schemas` to OpenAPI definition. Uses the `object's keys` as property names
openApi.add.manyOf(schemas, Paths.components.SCHEMAS, openApiDef);

//  Add data to OpenAPI definition where property is an array
openApi.add.oneOf_to_array(server, Paths.SERVERS, openApiDef);

//  Add callback to OpenAPI definition.
openApi.add.components_callback(dummyJSON, key, openApiDef);

//  Add example to OpenAPI definition.
openApi.add.components_example(dummyJSON, key, openApiDef);

//  Add header to OpenAPI definition.
openApi.add.components_header(dummyJSON, key, openApiDef);

//  Add link to OpenAPI definition.
openApi.add.components_link(dummyJSON, key, openApiDef);

//  Add parameter to OpenAPI definition.
openApi.add.components_parameter(dummyJSON, 'limitParam', openApiDef);

//  Add requestBody to OpenAPI definition.
openApi.add.components_requestBody(dummyJSON, key, openApiDef);

//  Add response to OpenAPI definition.
openApi.add.components_response(dummyJSON, 'NotFound', openApiDef);

//  Add schema to OpenAPI definition.
openApi.add.components_schema(schemas.schema_1, 'yourSchema', openApiDef);

//  Add securityScheme to OpenAPI definition.
openApi.add.components_securityScheme(dummyJSON, 'api_key', openApiDef);

//  Add path to OpenAPI definition.
openApi.add.path(dummyJSON, '/yourPath', openApiDef);

//  Add server to OpenAPI definition.
openApi.add.server(server, openApiDef);

//  Add security to OpenAPI definition.
openApi.add.security(dummyJSON, openApiDef);

//  Add tags to OpenAPI definition.
openApi.add.tags(dummyJSON, openApiDef);

//  Sets/overrides path 'externalDocs' in OpenAPI definition.
openApi.set.externalDocs(dummyJSON, openApiDef);

//  Sets/overrides path 'info' in OpenAPI definition.
openApi.set.info(dummyJSON, openApiDef);

//  Sets/overrides path 'info_contact' in OpenAPI definition.
openApi.set.info_contact(dummyJSON, openApiDef);

//  Sets/overrides path 'info_license' in OpenAPI definition.
openApi.set.info_license(dummyJSON, openApiDef);

//  Sets/overrides path 'openapi' in OpenAPI definition.
openApi.set.openapi(dummyJSON, openApiDef);

//  Sets/overrides path 'yourOwnPath' in OpenAPI definition.
openApi.set.other(dummyJSON, 'yourOwnPath' || 'components.examples', openApiDef);

```


## License

  [MIT](LICENSE)
