const _get = require('lodash.get');
const _set = require('lodash.set');

/**
 * OpenAPI definition structure
 * More info: https://swagger.io/specification
 * @readonly
 * @enum {string}
 */
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
};

/**
 * Set data to OpenAPI definition path
 * @param json {*}. data
 * @param path {Paths}, Ex: Paths.components.SCHEMA
 * @param openApiDef {object}, openApiDefinition object
 */
const set = (json, path, openApiDef) =>{
  if(!json) throw Error('[json] can not be empty');
  if(!path) throw Error('[path] can not be empty');
  if(!openApiDef) throw Error('[openApiDef] can not be empty');
  _set(openApiDef, path, json);
};

/**
 * Adds data to OpenAPI definition
 * @param json {*}. JSON data
 * @param path {Paths}, Ex: Paths.components.SCHEMA
 * @param key {string} {string}. Object key name
 * @param openApiDef {object}, openApiDefinition object
 */
const oneOf = (json, path, key, openApiDef) =>{
  if(!json) throw Error('[json] can not be empty');
  if(!path) throw Error('[path] can not be empty');
  if(!path in Paths) throw Error('[path] must be of type {Paths}');
  if(!key) throw Error('[key] can not be empty');
  if(!openApiDef) throw Error('[openApiDef] can not be empty');
  _set(openApiDef, path+'.'+key, json);
};

/**
 * Adds data to OpenAPI definition. Uses object keys as property names
 * @param objectOfData {object}. object containing openAPI JSON
 * @param path {Paths}, Ex: Paths.components.SCHEMA
 * @param openApiDef {object}, openApiDefinition object
 */
const manyOf = (objectOfData, path, openApiDef) =>{
  for (const key in objectOfData){
    const json = objectOfData[key];
    oneOf(json, path, key, openApiDef)
  }
};

/**
 * Add data to OpenAPI definition where 'Paths' is an array
 * @param json {object}, openAPI json data
 * @param path {Paths}, Ex: Paths.components.SCHEMA
 * @param openApiDefinition {object}, openApiDefinition object
 */
const oneOf_to_array = (json, path, openApiDefinition) =>{
  let array = _get(openApiDefinition, path);
  if (Array.isArray(array)) array.push(...json)
};

//  Export
let exportObj = {};

exportObj.paths = Paths;
exportObj.add = {
  oneOf,
  manyOf,
  oneOf_to_array,
  components_callback : (callback, key, openApiDefinition)=> _set(openApiDefinition, Paths.components.CALLBACKS+'.'+key, callback),
  components_example : (example, key, openApiDefinition)=> _set(openApiDefinition, Paths.components.EXAMPLES+'.'+key, example),
  components_header : (header, key, openApiDefinition)=> _set(openApiDefinition, Paths.components.HEADERS+'.'+key, header),
  components_link : (link, key, openApiDefinition)=> _set(openApiDefinition, Paths.components.LINKS+'.'+key, link),
  components_parameter : (parameter, key, openApiDefinition)=> _set(openApiDefinition, Paths.components.PARAMETERS+'.'+key, parameter),
  components_requestBody : (requestBody, key, openApiDefinition)=> _set(openApiDefinition, Paths.components.REQUEST_BODIES+'.'+key, requestBody),
  components_response : (response, key, openApiDefinition)=> _set(openApiDefinition, Paths.components.RESPONSES+'.'+key, response),
  components_schema : (schema, key, openApiDefinition)=> _set(openApiDefinition, Paths.components.SCHEMAS+'.'+key, schema),
  components_securityScheme : (securityScheme, key, openApiDefinition)=> _set(openApiDefinition, Paths.components.SECURITY_SCHEMES+'.'+key, securityScheme),
  path: (path, key, openApiDefinition)=> oneOf_to_array(path, Paths.paths[key], openApiDefinition),
  server: (server, openApiDefinition)=> oneOf_to_array(server, Paths.SERVERS, openApiDefinition),
  security: (security, openApiDefinition)=> oneOf_to_array(security, Paths.SECURITY, openApiDefinition),
  tags: (tag, openApiDefinition)=> oneOf_to_array(tag, Paths.TAGS, openApiDefinition),
};
exportObj.set = {
  externalDocs: (externalDocs, openApiDefinition) => set(externalDocs, Paths.externalDocs, openApiDefinition),
  info: (info, openApiDefinition) => set(info, Paths.info.ROOT, openApiDefinition),
  info_contact: (contact, openApiDefinition) => set(contact, Paths.info.contact.ROOT, openApiDefinition),
  info_license: (license, openApiDefinition) => set(license, Paths.info.license.ROOT, openApiDefinition),
  openapi: (openapi, openApiDefinition) => set(openapi, Paths.OPENAPI, openApiDefinition),
  other: (json, path, openApiDefinition)=> set(json, path, openApiDefinition),
};

module.exports = exportObj;