export default {
  input: 'bin/capnpc-es.js',
  output: {
    file: 'dist/bin/capnpc-es.js',
    format: 'cjs',
    banner: '#! /usr/bin/env node\n'
  }
};
