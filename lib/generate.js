import logger from './logger/default.js';
import Logger from './Logger.js';

/**
 * Generates an abstract syntax tree for ECMAscript modules from a binary representation of a Cap'n Proto schema
 * @param {ArrayBuffer} buffer the options to control the code generation
 */
export default function(buffer, logger=logger) {
  if (!(buffer instanceof ArrayBuffer)) {
    throw new OptionsError('Must provide a valid ArrayBuffer');
  }

  if (!(logger instanceof Logger)) {
    throw new OptionsError('Must provide a valid Logger');
  }

  logger.debug('Generating Cap\'n Proto ECMAscript modules');

  return [];
}
