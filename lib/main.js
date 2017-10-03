import Options from './main/Options.js';
import OptionsError from './main/OptionsError.js';

export {Options, OptionsError};

/**
 * The entry point for the generator
 * @param {Options} options the options to control the code generation
 */
export default function(options) {
  if (!(buffer instanceof Options)) {
    throw new OptionsError('Must provide an Options class');
  }

  const {logger, buffer} = options;

  logger.debug('Generating Cap\'n Proto ECMAscript modules');
  logger.debug(`Processing ${buffer.byteLength} bytes of data`);
}
