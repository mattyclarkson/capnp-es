import Logger from './Logger.js';

/**
 * Raised when a entry point option was invalid
 */
export class OptionsError extends Error {}

/**
 * The options for the main entry point
 * @param {Object} args the arguments for the class
 * @param {Object} [args.logger=Logger] the underlying logger that will be used to output the logging messages
 * @throws {OptionsError} if any of the `args` are invalid
 */
export class Options {
  constructor({logger=new Logger()} = {}) {
    Object.defineProperties(this, {
      logger: {value: logger}
    });
  }
}

/**
 * The entry point for the generator
 * @param {Options} options: the options to control the code generation
 */
export default function(options) {
  const {logger} = options;
  logger.debug('Generating Cap\'n Proto ECMAscript modules');

  return 0;
}
