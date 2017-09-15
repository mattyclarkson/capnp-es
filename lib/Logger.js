import {ERROR, WARN, INFO, DEBUG} from './logger/level.js';

/**
 * A logging class that can be used with most functions to provide status output
 * @param {Object} args the arguments for the class
 * @param {Object} [args.logger=console] the underlying logger that will be used to output the logging messages
 * @param {number} [args.level=logger.level.WARN] the logging level
 */
export default class {
  constructor({logger=console, level=WARN} = {}) {
    Object.defineProperties(this, {
      level: {value: level, writable: true},
      logger: {value: logger}
    });
  }

  /**
   * Logs a debug message, this is usually useful to developers
   * @param {...*} args the objects to log
   */
  debug(...args) {
    if (DEBUG <= this.level) {
      this.logger.debug(...args);
    }
  }

  /**
   * Logs a message that would be useful to a user
   * @param {...*} args the objects to log
   */
  info(...args) {
    if (INFO <= this.level) {
      this.logger.info(...args);
    }
  }

  /**
   * Logs a recoverable error
   * @param {...*} args the objects to log
   */
  warn(...args) {
    if (WARN <= this.level) {
      this.logger.warn(...args);
    }
  }

  /**
   * Logs a non-recoverable error
   * @param {...*} args the objects to log
   */
  error(...args) {
    if (ERROR <= this.level) {
      this.logger.error(...args);
    }
  }
}