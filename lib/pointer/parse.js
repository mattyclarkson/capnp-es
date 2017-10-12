import Struct from './Struct.js';

/**
 * Parses a pointer data view and resolves the pointers into the correct types
 * @param {DataView} the eight byte pointer to parse
 * @returns {Pointer} one of the pointer subclasses
 */
export default function(view) {
  const type = view.getUint32(0, true) & 3;
  switch (type) {
    case 0:
      return new Struct(view);
    default:
      throw TypeError(`Unsupported pointer type: ${type}`);
  }
}
