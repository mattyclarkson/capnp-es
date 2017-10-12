import which from 'which';
import {execFile} from 'child_process';

/**
 * An error that can occur when the compilation of a schema file fails
 * @param {String} message the error message that was returned from the compiler
 * @param {Integer} code the status code returned from the compiler
 */
export class CompilationError extends Error {
  constructor(message, code) {
    super(message);
    Object.defineProperties(this, {
      code: {value: code}
    });
  }
}

/**
 * Finds the Cap'n Proto compiler
 * @param {String} exe the location of the Cap'n Proto compiler to use
 * @throws {CompilationError} when the compiler cannot be found
 * @returns {Promise<String>} the location of the compiler
 */
export function compiler(exe=null) {
  return (exe) ? Promise.resolve(exe) : new Promise((resolve, reject) => {
    which('capnp', (err, exe) => {
      if (err) {
        reject(new CompilationError('Failed to find the Cap\'n Proto compiler', -199));
      } else {
        resolve(exe);
      }
    });
  });
}

/**
 * Performs compilation of a Cap'n Proto file into it's binary representation
 * @param {String} executable the location of the Cap'n Proto compiler to use
 * @param {String} schema the location of the schema file on the system
 * @throws {CompilationError} when the compilation fails
 * @returns {Promise<DataView>} the location of the compiled file
 */
function compile(executable, schema) {
  return new Promise((resolve, reject) => {
    execFile(executable, ['compile', '-o-', schema], {encoding: 'buffer'}, (err, stdout, stderr) => {
      if (err) {
        reject(new CompilationError(`Failed to compile: ${stderr}`, err.code));
      } else {
        resolve(new DataView(stdout.buffer, stdout.byteOffset, stdout.byteLength));
      }
    });
  });
}

/**
 * Compiles a Cap'n Proto schema file using the compiler
 * @async
 * @param {String} schema the location of the schema file on the system
 * @param {String} exe the location of the Cap'n Proto compiler to use
 * @throws {CompilationError} when the compilation fails
 * @returns {Promise<String>} the location of the compiled file
 */
export default async function(schema, exe=null) {
  const executable = await compiler(exe);
  return await compile(executable, schema);
}
