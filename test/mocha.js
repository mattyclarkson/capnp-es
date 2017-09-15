import chai from 'chai';
import {URL} from 'url';
import babelRegister from 'babel-register';
import fs from 'fs';
import path from 'path';

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json')));
const babelrc = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.babelrc')));
const ignoreRegexp = new RegExp(`node_modules/(?!${Object.keys(pkg.dependencies || {}).join('|')})`);
const options = Object.assign(babelrc, {ignore: (filename) => filename.match(ignoreRegexp), babelrc: false});
babelRegister(options);

global.chai = chai;
global.should = chai.should();
global.URL = URL;
