import log from './logger/default.js';
import Logger from './Logger.js';

/**
 * Generates an abstract syntax tree for ECMAscript modules from a binary representation of a Cap'n Proto schema
 * @param {DataView} data the data to process
 * @param {Logger} logger the output location for generation messages
 */
export default function(data, logger=log) {
  if (!(data instanceof DataView)) {
    throw new TypeError('Must provide a valid ArrayBuffer');
  }

  if (!(logger instanceof Logger)) {
    throw new TypeError('Must provide a valid Logger');
  }

  logger.debug('Generating Cap\'n Proto ECMAscript modules');

  return [];
}
