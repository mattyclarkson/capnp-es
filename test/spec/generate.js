import '../../lib/generate.js';

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
});
