import '../../lib/main.js';

describe('main', () => {
  before(function() {
    return fetchSchema('Id.capnp').catch(err => {
      if (err.response.status === 501) {
        this.skip();
      }
    });
  });

  it('can download of a compiled schema file', () => {
    return fetchSchema('Id.capnp');
  });
});
