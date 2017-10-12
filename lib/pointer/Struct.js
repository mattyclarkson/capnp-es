import Pointer from '../Pointer.js';

/**
 * Represents a structure pointer as described in the {@link https://capnproto.org/encoding.html#structs|Documentation}
 * @param view {DataView} the eight bytes that represent the pointer to parse
 */
export default class extends Pointer {
  constructor(view) {
    super();
    const low = view.getUint32(0, true);
    const offset = low >> 2;
    const data = view.getUint16(4, true);
    const pointer = view.getUint16(6, true);
    Object.defineProperties(this, {
      data: {value: new DataView(view.buffer, view.byteOffset + 8 + offset, data * 8)},
      pointers: {value: null},
    });
  }
}
