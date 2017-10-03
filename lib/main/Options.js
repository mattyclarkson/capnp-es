import Logger from '../Logger.js';
import OptionsError from './OptionsError.js';

/**
 * The options for the main entry point
 * @param {Object} args the arguments for the class
 * @param {Object} [args.logger=Logger] the underlying logger that will be used to output the logging messages
 * @throws {OptionsError} if any of the `args` are invalid
 */
export default class Options {
  constructor({buffer, logger=new Logger()} = {}) {
    Object.defineProperties(this, {
      logger: {value: logger},
      buffer: {value: buffer}
    });

    if (!(buffer instanceof ArrayBuffer)) {
      throw new OptionsError('\'buffer\' must be an \'ArrayBuffer\'');
    }
  }
}
