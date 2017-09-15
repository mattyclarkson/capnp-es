import {NONE, ERROR, WARN, INFO, DEBUG} from '../../lib/logger/level.js';
import Logger from '../../lib/Logger.js';

class Console {
  constructor() {
    Object.defineProperty(this, 'buffer', {value: '', writable: true});
  }

  debug(...args) {
    this.buffer += `debug: ${args.join(' ')}`;
  }

  info(...args) {
    this.buffer += `info: ${args.join(' ')}`;
  }

  warn(...args) {
    this.buffer += `warn: ${args.join(' ')}`;
  }

  error(...args) {
    this.buffer += `error: ${args.join(' ')}`;
  }
}

describe('Logger', () => {
  beforeEach(function() {
    const logger = new Console();
    this.logger = new Logger({logger});
    this.logger.logger.should.equal(logger);
  });

  describe('levels', () => {
    describe('NONE', function() {
      beforeEach(function() {
        this.logger.level = NONE;
      });

      it('should not honour the ERROR logging level', function() {
        const msg = 'test';
        this.logger.error(msg);
        this.logger.logger.buffer.should.be.empty;
      });

      it('should not honour the WARN logging level', function() {
        const msg = 'test';
        this.logger.warn(msg);
        this.logger.logger.buffer.should.be.empty;
      });

      it('should not honour the INFO logging level', function() {
        const msg = 'test';
        this.logger.info(msg);
        this.logger.logger.buffer.should.be.empty;
      });

      it('should not honour the DEBUG logging level', function() {
        const msg = 'test';
        this.logger.debug(msg);
        this.logger.logger.buffer.should.be.empty;
      });
    });

    describe('ERROR', function() {
      beforeEach(function() {
        this.logger.level = ERROR;
      });

      it('should honour the ERROR logging level', function() {
        const msg = 'test';
        this.logger.error(msg);
        this.logger.logger.buffer.should.equal(`error: ${msg}`);
      });

      it('should not honour the WARN logging level', function() {
        const msg = 'test';
        this.logger.warn(msg);
        this.logger.logger.buffer.should.be.empty;
      });

      it('should not honour the INFO logging level', function() {
        const msg = 'test';
        this.logger.info(msg);
        this.logger.logger.buffer.should.be.empty;
      });

      it('should not honour the DEBUG logging level', function() {
        const msg = 'test';
        this.logger.debug(msg);
        this.logger.logger.buffer.should.be.empty;
      });
    });

    describe('WARN', function() {
      beforeEach(function() {
        this.logger.level = WARN;
      });

      it('should honour the ERROR logging level', function() {
        const msg = 'test';
        this.logger.error(msg);
        this.logger.logger.buffer.should.equal(`error: ${msg}`);
      });

      it('should honour the WARN logging level', function() {
        const msg = 'test';
        this.logger.warn(msg);
        this.logger.logger.buffer.should.equal(`warn: ${msg}`);
      });

      it('should not honour the INFO logging level', function() {
        const msg = 'test';
        this.logger.info(msg);
        this.logger.logger.buffer.should.be.empty;
      });

      it('should not honour the DEBUG logging level', function() {
        const msg = 'test';
        this.logger.debug(msg);
        this.logger.logger.buffer.should.be.empty;
      });
    });

    describe('INFO', function() {
      beforeEach(function() {
        this.logger.level = INFO;
      });

      it('should honour the ERROR logging level', function() {
        const msg = 'test';
        this.logger.error(msg);
        this.logger.logger.buffer.should.equal(`error: ${msg}`);
      });

      it('should honour the WARN logging level', function() {
        const msg = 'test';
        this.logger.warn(msg);
        this.logger.logger.buffer.should.equal(`warn: ${msg}`);
      });

      it('should honour the INFO logging level', function() {
        const msg = 'test';
        this.logger.info(msg);
        this.logger.logger.buffer.should.equal(`info: ${msg}`);
      });

      it('should not honour the DEBUG logging level', function() {
        const msg = 'test';
        this.logger.debug(msg);
        this.logger.logger.buffer.should.be.empty;
      });
    });

    describe('DEBUG', function() {
      beforeEach(function() {
        this.logger.level = DEBUG;
      });

      it('should honour the ERROR logging level', function() {
        const msg = 'test';
        this.logger.error(msg);
        this.logger.logger.buffer.should.equal(`error: ${msg}`);
      });

      it('should honour the WARN logging level', function() {
        const msg = 'test';
        this.logger.warn(msg);
        this.logger.logger.buffer.should.equal(`warn: ${msg}`);
      });

      it('should honour the INFO logging level', function() {
        const msg = 'test';
        this.logger.info(msg);
        this.logger.logger.buffer.should.equal(`info: ${msg}`);
      });

      it('should honour the DEBUG logging level', function() {
        const msg = 'test';
        this.logger.debug(msg);
        this.logger.logger.buffer.should.equal(`debug: ${msg}`);
      });
    });
  });
});
