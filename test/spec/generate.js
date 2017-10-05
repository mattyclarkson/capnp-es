import generate from '../../lib/generate.js';

describe('generate', () => {
  before(function() {
    return fetchSchema('Id.capnp').catch(err => {
      if (err.response.status === 501) {
        this.skip();
      }
    });
  });

  it('can download a compiled schema file', () => {
    return fetchSchema('Id.capnp');
  });

  describe('primitives', () => {
    it.only('can process a Int32 structure', () => {
      return fetchSchema('Int32.capnp')
        .then(schema => generate(schema))
        .then(console.log);
    });
  });
});
