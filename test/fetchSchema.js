/**
 * Reports an error when fetching a URL
 * @param {String} message the error message for the error
 * @param {Response} response the result of the fetch request
 */
export class FetchError extends Error {
  constructor(message, response) {
    super(message);
    Object.defineProperties(this, {
      response: {value: response}
    });
  }
}

/**
 * Fetches a compiled schema file
 * @async
 * @param {String} schema the schema file to load from the fixtures directory
 * @throws {FetchError} when the fetching of the compiled schema fails
 * @returns {Promise<ArrayBuffer>} the compiled binary data
 */
export default async function(schema) {
  const headers = new Headers({'Accept': 'application/x-capnp-schema-binary'});
  const response = await fetch(`${location.origin}/${schema}`, {headers});

  if (!response.ok) {
    const json = await response.json();
    const {error} = json;
    throw new FetchError(error, response);
  }

  const ab = await response.arrayBuffer();

  return new DataView(ab);
}


