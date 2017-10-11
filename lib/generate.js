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

  // Bootstrapping
  // capnp compile -ocapnp ~/git/github/capnproto/capnproto/c++/src/capnp/schema.capnp

  // The format of the incoming message is described here: https://capnproto.org/encoding.html

  // This is what we get from the compiler
  /*
      struct CodeGeneratorRequest @0xbfc546f6210ad7ce {  # 0 bytes, 4 ptrs
        capnpVersion @2 :CapnpVersion;  # ptr[2]
        nodes @0 :List(Node);  # ptr[0]
        sourceInfo @3 :List(Node.SourceInfo);  # ptr[3]
        requestedFiles @1 :List(RequestedFile);  # ptr[1]
        struct RequestedFile @0xcfea0eb02e810062 {  # 8 bytes, 2 ptrs
          id @0 :UInt64;  # bits[0, 64)
          filename @1 :Text;  # ptr[0]
          imports @2 :List(Import);  # ptr[1]
          struct Import @0xae504193122357e5 {  # 8 bytes, 1 ptrs
            id @0 :UInt64;  # bits[0, 64)
            name @1 :Text;  # ptr[0]
          }
        }
      }
  */

  // In this format: https://capnproto.org/encoding.html#serialization-over-a-stream

  const data = new DataView(buffer);
  function* size() {
    const segments = data.getUint32(0, true) + 1;
    const byteOffset = 4 + (4 * segments) + (((segments - 1) % 2) * 4);
    for (let i = 0; i < segments; ++i) {
      const words = data.getUint32(4 * (i + 1), true);
      yield new DataView(buffer, byteOffset, (words * 8));
    }
  }

  const segments = Array.from(size());

  if (segments.length !== 1) {
    throw RangeError(`Unsupported number of segments: ${segments.length}`);
  }

  const [segment] = segments;

  function pointer(view) {
    const high = view.getUint32(0, true);
    const type = high >>> 30;
    const offset = high & 0x3FFFFFFF;
    const data = view.getUint16(4, true);
    const pointer = view.getUint16(6, true);
    return {type, offset, data, pointer};
  }

  console.log(pointer(new DataView(segment.buffer, segment.byteOffset, 8)));
  console.log(pointer(new DataView(segment.buffer, segment.byteOffset + 8, 8)));
  console.log(pointer(new DataView(segment.buffer, segment.byteOffset + 16, 8)));
  console.log(pointer(new DataView(segment.buffer, segment.byteOffset + 24, 8)));

  return [];
}
