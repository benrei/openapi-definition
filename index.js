const _get = require('lodash.get');
const _set = require('lodash.set');

/**
 * OpenAPI definition structure
 * More info: https://swagger.io/specification
 * @readonly
 * @enum {string}
 */
const OpenApi = {
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
};

/**
 * Add data to OpenAPI definition where 'property' is an array
 * @param definition {object}, OpenAPI definition
 * @param path {OpenApi}, Ex: OpenApi.components.SCHEMA
 * @param value {object}, Ex: {prop1: val1, ...}
 */
const addToArray = (definition, path, value) =>{
  let array = _get(definition, path);
  if (Array.isArray(array)) array.push(...value);
  _set(definition, path, array)
};

//  Export
let exportObj = {};

exportObj.OpenApi = OpenApi;
exportObj.add = {
  components_callback : (definition, key, obj)=> _set(definition, `${OpenApi.components.CALLBACKS}.${key}`, obj),
  components_example : (definition, key, obj)=> _set(definition, `${OpenApi.components.EXAMPLES}.${key}`, obj),
  components_header : (definition, key, obj)=> _set(definition, `${OpenApi.components.HEADERS}.${key}`, obj),
  components_link : (definition, key, obj)=> _set(definition, `${OpenApi.components.LINKS}.${key}`, obj),
  components_parameter : (definition, key, obj)=> _set(definition, `${OpenApi.components.PARAMETERS}.${key}`, obj),
  components_requestBody : (definition, key, obj)=> _set(definition, `${OpenApi.components.REQUEST_BODIES}.${key}`, obj),
  components_response : (definition, key, obj)=> _set(definition, `${OpenApi.components.RESPONSES}.${key}`, obj),
  components_schema : (definition, key, obj)=> _set(definition, `${OpenApi.components.SCHEMAS}.${key}`, obj),
  components_securityScheme : (definition, key, obj)=> _set(definition, `${OpenApi.components.SECURITY_SCHEMES}.${key}`, obj),
  path : (definition, key, obj)=> _set(definition, `${OpenApi.paths}.${key}`, obj),
  server: (definition, obj)=> addToArray(definition, OpenApi.SERVERS, obj),
  security: (definition, obj)=> addToArray(definition, OpenApi.SECURITY, obj),
  tag: (definition, obj)=> addToArray(definition, OpenApi.TAGS, obj),
};
exportObj.set = {
  externalDocs: (definition, value) => _set(definition, OpenApi.externalDocs, value),
  info: (definition, value) => _set(definition, OpenApi.info.ROOT, value),
  info_contact: (definition, value) => _set(definition, OpenApi.info.contact.ROOT, value),
  info_license: (definition, value) => _set(definition, OpenApi.info.license.ROOT, value),
  openapi: (definition, value) => _set(definition, OpenApi.OPENAPI, value),
  other: (definition, path, value) => _set(definition, path, value),
};

module.exports = exportObj;