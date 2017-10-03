import path from 'path';
import compile, {compiler} from '../compile.js';

/**
 * Provides a middleware that can compile Cap'n Proto schema files into their binary representation and return them to
 * the client.
 *
 * Will return a `501` error if the Cap'n Proto compiler cannot be found on the server.
 * @param {String} root the root location of the schema files to return
 * @returns {Function} a middleware function that can handle HTTP requests
 */
export default function(root) {
  return function(request, response, next) {
    const {accept} = request.headers;
    if (['application/x-capnp-schema-binary', 'application/*', '*/*'].indexOf(accept) === -1) {
      response.writeHead(406, {'Content-Type': 'application/json'});
      response.end(JSON.stringify({error: `Invalid accepts: ${accept}`}));
      return;
    }

    const url = new URL(`${location.origin}${request.url}`);
    compiler()
      .then(executable => {
        return compile(path.join(root, url.pathname), executable)
          .then(schema => {
            response.writeHead(200, {'Content-Type': 'application/x-capnp-schema-binary'});
            response.end(Buffer.from(schema, 0, schema.length));
          })
          .catch(err => {
            response.writeHead(500, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({error: `Failed to compile schema: ${err.message}`}));
          });
      }, err => {
        response.writeHead(501, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({error: `Failed to find compiler: ${err}`}));
      })
      .then(next, next);
  };
}

