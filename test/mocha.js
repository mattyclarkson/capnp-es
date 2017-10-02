import chai from 'chai';
import {URL} from 'whatwg-url';
import babelRegister from 'babel-register';
import fs from 'fs';
import http from 'http';
import path from 'path';
import fetch, {Headers, Request, Response} from 'node-fetch';
import compile, {compiler} from '../lib/compile.js';
import fetchSchema from './fetchSchema.js';

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json')));
const babelrc = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.babelrc')));
const ignoreRegexp = new RegExp(`node_modules/(?!${Object.keys(pkg.dependencies || {}).join('|')})`);
const options = Object.assign(babelrc, {ignore: (filename) => filename.match(ignoreRegexp), babelrc: false});
babelRegister(options);

const port = 58956;

global.chai = chai;
global.should = chai.should();
global.URL = URL;
global.fetch = fetch;
global.fetchSchema = fetchSchema;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;
global.location = {
  origin: `http://localhost:${port}`
};

function handleRequest(request, response) {
  const {accept} = request.headers;
  if (['application/x-capnp-schema-binary', 'application/*', '*/*'].indexOf(accept) === -1) {
    response.writeHead(406, {'Content-Type': 'application/json'});
    response.end(JSON.stringify({error: `Invalid accepts: ${accept}`}));
  }

  const url = new URL(`${location.origin}${request.url}`);
  compiler()
    .catch(err => {
      response.writeHead(501, {'Content-Type': 'application/json'});
      response.end(JSON.stringify({error: `Failed to find compiler: ${err}`}));
    })
    .then(executable => {
      return compile(path.join(__dirname, 'fixtures', url.pathname), executable)
        .then(schema => {
          response.writeHead(200, {'Content-Type': 'application/x-capnp-schema-binary'});
          response.end(Buffer.from(schema, 0, schema.length));
        })
        .catch(err => {
          response.writeHead(500, {'Content-Type': 'application/json'});
          response.end(JSON.stringify({error: `Failed to compile schema: ${err.message}`}));
        });
    });
}

before(function(done) {
  this.port = port;
  this.server = http.createServer(handleRequest);
  this.server.listen(this.port, done);
});

after(function(done) {
  this.server.close(done);
});
