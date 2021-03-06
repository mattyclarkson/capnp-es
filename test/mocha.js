import chai from 'chai';
import {URL} from 'whatwg-url';
import babelRegister from 'babel-register';
import fs from 'fs';
import http from 'http';
import path from 'path';
import fetch, {Headers, Request, Response} from 'node-fetch';
import compile from '../lib/middleware/compile.js';
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

before(function(done) {
  this.port = port;
  const middleware = compile(path.join(__dirname, 'fixtures'));
  this.server = http.createServer(middleware);
  this.server.listen(this.port, done);
});

after(function(done) {
  this.server.close(done);
});
