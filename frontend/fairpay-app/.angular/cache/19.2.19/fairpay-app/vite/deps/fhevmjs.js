import {
  require_js,
  threads
} from "./chunk-WKCBSF47.js";
import {
  BrowserProvider,
  Contract,
  JsonRpcProvider,
  ethers_exports,
  getAddress,
  isAddress
} from "./chunk-QWNZ7TY4.js";
import "./chunk-BUQAI4IO.js";
import {
  __async,
  __commonJS,
  __objRest,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-KTESVR3Q.js";

// node_modules/bigint-buffer/dist/browser.js
var require_browser = __commonJS({
  "node_modules/bigint-buffer/dist/browser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var converter;
    function toBigIntLE(buf) {
      {
        const reversed = Buffer.from(buf);
        reversed.reverse();
        const hex = reversed.toString("hex");
        if (hex.length === 0) {
          return BigInt(0);
        }
        return BigInt(`0x${hex}`);
      }
      return converter.toBigInt(buf, false);
    }
    exports.toBigIntLE = toBigIntLE;
    function toBigIntBE2(buf) {
      {
        const hex = buf.toString("hex");
        if (hex.length === 0) {
          return BigInt(0);
        }
        return BigInt(`0x${hex}`);
      }
      return converter.toBigInt(buf, true);
    }
    exports.toBigIntBE = toBigIntBE2;
    function toBufferLE(num, width) {
      {
        const hex = num.toString(16);
        const buffer = Buffer.from(hex.padStart(width * 2, "0").slice(0, width * 2), "hex");
        buffer.reverse();
        return buffer;
      }
      return converter.fromBigInt(num, Buffer.allocUnsafe(width), false);
    }
    exports.toBufferLE = toBufferLE;
    function toBufferBE(num, width) {
      {
        const hex = num.toString(16);
        return Buffer.from(hex.padStart(width * 2, "0").slice(0, width * 2), "hex");
      }
      return converter.fromBigInt(num, Buffer.allocUnsafe(width), true);
    }
    exports.toBufferBE = toBufferBE;
  }
});

// node_modules/fhevmjs/lib/web.js
var import_bigint_buffer = __toESM(require_browser());
var import_keccak = __toESM(require_js());
var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
function startWorkers(module2, memory, builder) {
  return __async(this, null, function* () {
    if (builder.numThreads() === 0) {
      throw new Error(`num_threads must be > 0.`);
    }
    const workerInit = {
      module: module2,
      memory,
      receiver: builder.receiver()
    };
    yield Promise.all(Array.from({
      length: builder.numThreads()
    }, () => __async(null, null, function* () {
      const worker = new Worker(new URL("./workerHelpers.worker.js", import.meta.url), {
        type: "module"
      });
      worker.postMessage(workerInit);
      yield new Promise((resolve) => worker.addEventListener("message", resolve, {
        once: true
      }));
      return worker;
    })));
    builder.build();
  });
}
var wasm$1;
var heap = new Array(128).fill(void 0);
heap.push(void 0, null, true, false);
var heap_next = heap.length;
function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}
function getObject(idx) {
  return heap[idx];
}
function dropObject(idx) {
  if (idx < 132) return;
  heap[idx] = heap_next;
  heap_next = idx;
}
function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
var cachedTextDecoder$1 = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8", {
  ignoreBOM: true,
  fatal: true
}) : {
  decode: () => {
    throw Error("TextDecoder not available");
  }
};
if (typeof TextDecoder !== "undefined") {
  cachedTextDecoder$1.decode();
}
var cachedUint8ArrayMemory0$1 = null;
function getUint8ArrayMemory0$1() {
  if (cachedUint8ArrayMemory0$1 === null || cachedUint8ArrayMemory0$1.buffer !== wasm$1.memory.buffer) {
    cachedUint8ArrayMemory0$1 = new Uint8Array(wasm$1.memory.buffer);
  }
  return cachedUint8ArrayMemory0$1;
}
function getStringFromWasm0$1(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder$1.decode(getUint8ArrayMemory0$1().slice(ptr, ptr + len));
}
var WASM_VECTOR_LEN$1 = 0;
var cachedTextEncoder$1 = typeof TextEncoder !== "undefined" ? new TextEncoder("utf-8") : {
  encode: () => {
    throw Error("TextEncoder not available");
  }
};
var encodeString$1 = function(arg, view) {
  const buf = cachedTextEncoder$1.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};
function passStringToWasm0$1(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder$1.encode(arg);
    const ptr2 = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0$1().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN$1 = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;
  const mem = getUint8ArrayMemory0$1();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127) break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8ArrayMemory0$1().subarray(ptr + offset, ptr + len);
    const ret = encodeString$1(arg, view);
    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }
  WASM_VECTOR_LEN$1 = offset;
  return ptr;
}
function isLikeNone$1(x) {
  return x === void 0 || x === null;
}
var cachedDataViewMemory0$1 = null;
function getDataViewMemory0$1() {
  if (cachedDataViewMemory0$1 === null || cachedDataViewMemory0$1.buffer !== wasm$1.memory.buffer) {
    cachedDataViewMemory0$1 = new DataView(wasm$1.memory.buffer);
  }
  return cachedDataViewMemory0$1;
}
function debugString$1(val) {
  const type = typeof val;
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`;
  }
  if (type == "string") {
    return `"${val}"`;
  }
  if (type == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = "[";
    if (length > 0) {
      debug += debugString$1(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug += ", " + debugString$1(val[i]);
    }
    debug += "]";
    return debug;
  }
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    return toString.call(val);
  }
  if (className == "Object") {
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  if (val instanceof Error) {
    return `${val.name}: ${val.message}
${val.stack}`;
  }
  return className;
}
function _assertClass$1(instance, klass) {
  if (!(instance instanceof klass)) {
    throw new Error(`expected instance of ${klass.name}`);
  }
  return instance.ptr;
}
function getArrayU8FromWasm0$1(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ArrayMemory0$1().subarray(ptr / 1, ptr / 1 + len);
}
function passArray8ToWasm0$1(arg, malloc) {
  const ptr = malloc(arg.length * 1, 1) >>> 0;
  getUint8ArrayMemory0$1().set(arg, ptr / 1);
  WASM_VECTOR_LEN$1 = arg.length;
  return ptr;
}
function init_panic_hook() {
  wasm$1.init_panic_hook();
}
function handleError$1(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm$1.__wbindgen_exn_store(addHeapObject(e));
  }
}
function initThreadPool(num_threads) {
  const ret = wasm$1.initThreadPool(num_threads);
  return takeObject(ret);
}
var ZkComputeLoad = Object.freeze({
  Proof: 0,
  "0": "Proof",
  Verify: 1,
  "1": "Verify"
});
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_boolean_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_booleanciphertext_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_booleanclientkey_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_booleancompressedciphertext_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_booleancompressedserverkey_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_booleannoisedistribution_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_booleanparameters_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_booleanpublickey_free(ptr >>> 0, 1));
var CompactCiphertextListFinalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compactciphertextlist_free(ptr >>> 0, 1));
var CompactCiphertextList = class _CompactCiphertextList {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_CompactCiphertextList.prototype);
    obj.__wbg_ptr = ptr;
    CompactCiphertextListFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    CompactCiphertextListFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_compactciphertextlist_free(ptr, 0);
  }
  /**
  * @param {TfheCompactPublicKey} public_key
  * @returns {CompactCiphertextListBuilder}
  */
  static builder(public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfheCompactPublicKey);
      wasm$1.compactciphertextlist_builder(retptr, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CompactCiphertextListBuilder.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {number}
  */
  len() {
    const ret = wasm$1.compactciphertextlist_len(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
  * @returns {boolean}
  */
  is_empty() {
    const ret = wasm$1.compactciphertextlist_is_empty(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
  * @param {number} index
  * @returns {FheTypes | undefined}
  */
  get_kind_of(index) {
    const ret = wasm$1.compactciphertextlist_get_kind_of(this.__wbg_ptr, index);
    return ret === 30 ? void 0 : ret;
  }
  /**
  * @returns {CompactCiphertextListExpander}
  */
  expand() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlist_expand(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CompactCiphertextListExpander.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlist_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {CompactCiphertextList}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.compactciphertextlist_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _CompactCiphertextList.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlist_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {CompactCiphertextList}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.compactciphertextlist_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _CompactCiphertextList.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var CompactCiphertextListBuilderFinalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compactciphertextlistbuilder_free(ptr >>> 0, 1));
var CompactCiphertextListBuilder = class _CompactCiphertextListBuilder {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_CompactCiphertextListBuilder.prototype);
    obj.__wbg_ptr = ptr;
    CompactCiphertextListBuilderFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    CompactCiphertextListBuilderFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_compactciphertextlistbuilder_free(ptr, 0);
  }
  /**
  * @param {number} value
  */
  push_u2(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_u2(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_u4(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_u4(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_u6(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_u6(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_u8(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_u8(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_u10(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_u10(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_u12(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_u12(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_u14(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_u14(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_u16(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_u16(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_u32(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_u32(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} value
  */
  push_u64(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_u64(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_i2(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_i2(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_i4(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_i4(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_i6(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_i6(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_i8(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_i8(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_i10(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_i10(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_i12(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_i12(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_i14(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_i14(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_i16(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_i16(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_i32(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_i32(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} value
  */
  push_i64(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_i64(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  */
  push_u128(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_u128(retptr, this.__wbg_ptr, addHeapObject(value));
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  */
  push_u160(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_u160(retptr, this.__wbg_ptr, addHeapObject(value));
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  */
  push_u256(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_u256(retptr, this.__wbg_ptr, addHeapObject(value));
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  */
  push_u512(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_u512(retptr, this.__wbg_ptr, addHeapObject(value));
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  */
  push_u1024(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_u1024(retptr, this.__wbg_ptr, addHeapObject(value));
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  */
  push_u2048(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_u2048(retptr, this.__wbg_ptr, addHeapObject(value));
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  */
  push_i128(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_i128(retptr, this.__wbg_ptr, addHeapObject(value));
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  */
  push_i160(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_i160(retptr, this.__wbg_ptr, addHeapObject(value));
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  */
  push_i256(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_i256(retptr, this.__wbg_ptr, addHeapObject(value));
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {boolean} value
  */
  push_boolean(value) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_push_boolean(retptr, this.__wbg_ptr, value);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      if (r1) {
        throw takeObject(r0);
      }
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {CompactCiphertextList}
  */
  build() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_build(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CompactCiphertextList.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {CompactCiphertextList}
  */
  build_packed() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistbuilder_build_packed(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CompactCiphertextList.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {CompactPkePublicParams} public_params
  * @param {Uint8Array} metadata
  * @param {ZkComputeLoad} compute_load
  * @returns {ProvenCompactCiphertextList}
  */
  build_with_proof_packed(public_params, metadata, compute_load) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_params, CompactPkePublicParams);
      const ptr0 = passArray8ToWasm0$1(metadata, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.compactciphertextlistbuilder_build_with_proof_packed(retptr, this.__wbg_ptr, public_params.__wbg_ptr, ptr0, len0, compute_load);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return ProvenCompactCiphertextList.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var CompactCiphertextListExpanderFinalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compactciphertextlistexpander_free(ptr >>> 0, 1));
var CompactCiphertextListExpander = class _CompactCiphertextListExpander {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_CompactCiphertextListExpander.prototype);
    obj.__wbg_ptr = ptr;
    CompactCiphertextListExpanderFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    CompactCiphertextListExpanderFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_compactciphertextlistexpander_free(ptr, 0);
  }
  /**
  * @param {number} index
  * @returns {FheUint2}
  */
  get_uint2(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_uint2(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheUint2.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint4}
  */
  get_uint4(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_uint4(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheUint4.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint6}
  */
  get_uint6(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_uint6(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheUint6.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint8}
  */
  get_uint8(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_uint8(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheUint8.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint10}
  */
  get_uint10(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_uint10(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheUint10.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint12}
  */
  get_uint12(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_uint12(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheUint12.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint14}
  */
  get_uint14(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_uint14(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheUint14.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint16}
  */
  get_uint16(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_uint16(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheUint16.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint32}
  */
  get_uint32(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_uint32(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheUint32.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint64}
  */
  get_uint64(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_uint64(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheUint64.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint128}
  */
  get_uint128(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_uint128(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheUint128.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint160}
  */
  get_uint160(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_uint160(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheUint160.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint256}
  */
  get_uint256(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_uint256(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheUint256.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint512}
  */
  get_uint512(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_uint512(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheUint512.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint1024}
  */
  get_uint1024(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_uint1024(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheUint1024.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint2048}
  */
  get_uint2048(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_uint2048(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheUint2048.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt2}
  */
  get_int2(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_int2(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheInt2.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt4}
  */
  get_int4(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_int4(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheInt4.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt6}
  */
  get_int6(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_int6(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheInt6.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt8}
  */
  get_int8(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_int8(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheInt8.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt10}
  */
  get_int10(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_int10(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheInt10.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt12}
  */
  get_int12(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_int12(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheInt12.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt14}
  */
  get_int14(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_int14(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheInt14.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt16}
  */
  get_int16(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_int16(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheInt16.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt32}
  */
  get_int32(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_int32(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheInt32.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt64}
  */
  get_int64(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_int64(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheInt64.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt128}
  */
  get_int128(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_int128(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheInt128.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt160}
  */
  get_int160(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_int160(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheInt160.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt256}
  */
  get_int256(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_int256(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheInt256.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheBool}
  */
  get_bool(index) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactciphertextlistexpander_get_bool(retptr, this.__wbg_ptr, index);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return FheBool.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {number}
  */
  len() {
    const ret = wasm$1.compactciphertextlistexpander_len(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
  * @returns {boolean}
  */
  is_empty() {
    const ret = wasm$1.compactciphertextlistexpander_is_empty(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
  * @param {number} index
  * @returns {FheTypes | undefined}
  */
  get_kind_of(index) {
    const ret = wasm$1.compactciphertextlistexpander_get_kind_of(this.__wbg_ptr, index);
    return ret === 30 ? void 0 : ret;
  }
};
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compactpkecrs_free(ptr >>> 0, 1));
var CompactPkePublicParamsFinalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compactpkepublicparams_free(ptr >>> 0, 1));
var CompactPkePublicParams = class _CompactPkePublicParams {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_CompactPkePublicParams.prototype);
    obj.__wbg_ptr = ptr;
    CompactPkePublicParamsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    CompactPkePublicParamsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_compactpkepublicparams_free(ptr, 0);
  }
  /**
  * @param {boolean} compress
  * @returns {Uint8Array}
  */
  serialize(compress) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactpkepublicparams_serialize(retptr, this.__wbg_ptr, compress);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {CompactPkePublicParams}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.compactpkepublicparams_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _CompactPkePublicParams.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.compactpkepublicparams_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {CompactPkePublicParams}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.compactpkepublicparams_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _CompactPkePublicParams.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfhebool_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheint10_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheint12_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheint128_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheint14_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheint16_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheint160_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheint2_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheint256_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheint32_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheint4_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheint6_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheint64_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheint8_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheuint10_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheuint1024_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheuint12_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheuint128_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheuint14_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheuint16_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheuint160_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheuint2_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheuint2048_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheuint256_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheuint32_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheuint4_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheuint512_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheuint6_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheuint64_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_compressedfheuint8_free(ptr >>> 0, 1));
var FheBoolFinalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fhebool_free(ptr >>> 0, 1));
var FheBool = class _FheBool {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheBool.prototype);
    obj.__wbg_ptr = ptr;
    FheBoolFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheBoolFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fhebool_free(ptr, 0);
  }
  /**
  * @param {boolean} value
  * @param {TfheClientKey} client_key
  * @returns {FheBool}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fhebool_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheBool.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {boolean} value
  * @param {TfhePublicKey} public_key
  * @returns {FheBool}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fhebool_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheBool.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {boolean} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheBool}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fhebool_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheBool.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {boolean}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fhebool_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return r0 !== 0;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fhebool_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheBool}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fhebool_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheBool.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fhebool_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheBool}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fhebool_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheBool.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheInt10Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheint10_free(ptr >>> 0, 1));
var FheInt10 = class _FheInt10 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheInt10.prototype);
    obj.__wbg_ptr = ptr;
    FheInt10Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheInt10Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheint10_free(ptr, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt10}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint10_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt10.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt10}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheint10_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt10.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt10}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheint10_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt10.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint10_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return r0;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint10_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt10}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint10_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt10.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint10_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt10}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint10_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt10.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheInt12Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheint12_free(ptr >>> 0, 1));
var FheInt12 = class _FheInt12 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheInt12.prototype);
    obj.__wbg_ptr = ptr;
    FheInt12Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheInt12Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheint12_free(ptr, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt12}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint12_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt12.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt12}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheint12_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt12.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt12}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheint12_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt12.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint10_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return r0;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint12_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt12}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint12_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt12.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint12_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt12}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint12_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt12.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheInt128Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheint128_free(ptr >>> 0, 1));
var FheInt128 = class _FheInt128 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheInt128.prototype);
    obj.__wbg_ptr = ptr;
    FheInt128Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheInt128Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheint128_free(ptr, 0);
  }
  /**
  * @param {any} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt128}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint128_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt128.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt128}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheint128_encrypt_with_public_key(retptr, addHeapObject(value), public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt128.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt128}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheint128_encrypt_with_compressed_public_key(retptr, addHeapObject(value), compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt128.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {any}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint128_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return takeObject(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint128_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt128}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint128_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt128.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint128_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt128}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint128_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt128.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheInt14Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheint14_free(ptr >>> 0, 1));
var FheInt14 = class _FheInt14 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheInt14.prototype);
    obj.__wbg_ptr = ptr;
    FheInt14Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheInt14Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheint14_free(ptr, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt14}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint14_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt14.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt14}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheint14_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt14.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt14}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheint14_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt14.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint10_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return r0;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint14_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt14}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint14_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt14.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint14_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt14}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint14_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt14.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheInt16Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheint16_free(ptr >>> 0, 1));
var FheInt16 = class _FheInt16 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheInt16.prototype);
    obj.__wbg_ptr = ptr;
    FheInt16Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheInt16Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheint16_free(ptr, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt16}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint16_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt16.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt16}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheint16_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt16.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt16}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheint16_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt16.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint10_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return r0;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint16_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt16}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint16_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt16.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint16_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt16}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint16_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt16.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheInt160Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheint160_free(ptr >>> 0, 1));
var FheInt160 = class _FheInt160 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheInt160.prototype);
    obj.__wbg_ptr = ptr;
    FheInt160Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheInt160Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheint160_free(ptr, 0);
  }
  /**
  * @param {any} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt160}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint160_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt160.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt160}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheint160_encrypt_with_public_key(retptr, addHeapObject(value), public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt160.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt160}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheint160_encrypt_with_compressed_public_key(retptr, addHeapObject(value), compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt160.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {any}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint160_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return takeObject(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint160_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt160}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint160_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt160.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint160_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt160}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint160_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt160.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheInt2Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheint2_free(ptr >>> 0, 1));
var FheInt2 = class _FheInt2 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheInt2.prototype);
    obj.__wbg_ptr = ptr;
    FheInt2Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheInt2Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheint2_free(ptr, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt2}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint2_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt2.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt2}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheint2_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt2.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt2}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheint2_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt2.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint2_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return r0;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint2_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt2}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint2_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt2.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint2_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt2}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint2_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt2.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheInt256Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheint256_free(ptr >>> 0, 1));
var FheInt256 = class _FheInt256 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheInt256.prototype);
    obj.__wbg_ptr = ptr;
    FheInt256Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheInt256Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheint256_free(ptr, 0);
  }
  /**
  * @param {any} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt256}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint256_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt256.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt256}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheint256_encrypt_with_public_key(retptr, addHeapObject(value), public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt256.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt256}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheint256_encrypt_with_compressed_public_key(retptr, addHeapObject(value), compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt256.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {any}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint160_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return takeObject(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint256_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt256}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint256_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt256.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint256_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt256}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint256_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt256.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheInt32Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheint32_free(ptr >>> 0, 1));
var FheInt32 = class _FheInt32 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheInt32.prototype);
    obj.__wbg_ptr = ptr;
    FheInt32Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheInt32Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheint32_free(ptr, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt32}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint32_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt32.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt32}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheint32_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt32.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt32}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheint32_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt32.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint32_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return r0;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint32_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt32}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint32_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt32.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint32_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt32}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint32_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt32.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheInt4Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheint4_free(ptr >>> 0, 1));
var FheInt4 = class _FheInt4 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheInt4.prototype);
    obj.__wbg_ptr = ptr;
    FheInt4Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheInt4Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheint4_free(ptr, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt4}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint4_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt4.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt4}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheint4_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt4.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt4}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheint4_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt4.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint2_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return r0;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint4_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt4}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint4_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt4.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint4_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt4}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint4_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt4.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheInt6Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheint6_free(ptr >>> 0, 1));
var FheInt6 = class _FheInt6 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheInt6.prototype);
    obj.__wbg_ptr = ptr;
    FheInt6Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheInt6Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheint6_free(ptr, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt6}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint6_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt6.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt6}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheint6_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt6.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt6}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheint6_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt6.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint2_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return r0;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint6_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt6}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint6_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt6.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint6_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt6}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint6_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt6.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheInt64Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheint64_free(ptr >>> 0, 1));
var FheInt64 = class _FheInt64 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheInt64.prototype);
    obj.__wbg_ptr = ptr;
    FheInt64Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheInt64Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheint64_free(ptr, 0);
  }
  /**
  * @param {bigint} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt64}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint64_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt64.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt64}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheint64_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt64.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt64}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheint64_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt64.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {bigint}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint64_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getBigInt64(retptr + 8 * 0, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      return r0;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint64_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt64}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint64_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt64.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint64_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt64}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint64_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt64.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheInt8Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheint8_free(ptr >>> 0, 1));
var FheInt8 = class _FheInt8 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheInt8.prototype);
    obj.__wbg_ptr = ptr;
    FheInt8Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheInt8Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheint8_free(ptr, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt8}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint8_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt8.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt8}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheint8_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt8.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt8}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheint8_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt8.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheint2_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return r0;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint8_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt8}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint8_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt8.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheint8_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt8}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheint8_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheInt8.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheUint10Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheuint10_free(ptr >>> 0, 1));
var FheUint10 = class _FheUint10 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheUint10.prototype);
    obj.__wbg_ptr = ptr;
    FheUint10Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheUint10Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheuint10_free(ptr, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint10}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint10_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint10.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint10}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheuint10_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint10.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint10}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheuint10_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint10.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint10_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return r0;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint10_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint10}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint10_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint10.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint10_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint10}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint10_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint10.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheUint1024Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheuint1024_free(ptr >>> 0, 1));
var FheUint1024 = class _FheUint1024 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheUint1024.prototype);
    obj.__wbg_ptr = ptr;
    FheUint1024Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheUint1024Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheuint1024_free(ptr, 0);
  }
  /**
  * @param {any} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint1024}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint1024_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint1024.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint1024}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheuint1024_encrypt_with_public_key(retptr, addHeapObject(value), public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint1024.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint1024}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheuint1024_encrypt_with_compressed_public_key(retptr, addHeapObject(value), compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint1024.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {any}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint1024_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return takeObject(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint1024_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint1024}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint1024_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint1024.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint1024_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint1024}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint1024_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint1024.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheUint12Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheuint12_free(ptr >>> 0, 1));
var FheUint12 = class _FheUint12 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheUint12.prototype);
    obj.__wbg_ptr = ptr;
    FheUint12Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheUint12Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheuint12_free(ptr, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint12}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint12_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint12.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint12}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheuint12_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint12.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint12}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheuint12_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint12.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint10_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return r0;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint12_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint12}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint12_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint12.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint12_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint12}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint12_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint12.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheUint128Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheuint128_free(ptr >>> 0, 1));
var FheUint128 = class _FheUint128 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheUint128.prototype);
    obj.__wbg_ptr = ptr;
    FheUint128Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheUint128Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheuint128_free(ptr, 0);
  }
  /**
  * @param {any} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint128}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint128_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint128.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint128}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheuint128_encrypt_with_public_key(retptr, addHeapObject(value), public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint128.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint128}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheuint128_encrypt_with_compressed_public_key(retptr, addHeapObject(value), compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint128.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {any}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint128_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return takeObject(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint128_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint128}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint128_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint128.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint128_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint128}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint128_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint128.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheUint14Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheuint14_free(ptr >>> 0, 1));
var FheUint14 = class _FheUint14 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheUint14.prototype);
    obj.__wbg_ptr = ptr;
    FheUint14Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheUint14Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheuint14_free(ptr, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint14}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint14_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint14.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint14}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheuint14_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint14.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint14}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheuint14_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint14.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint10_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return r0;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint14_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint14}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint14_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint14.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint14_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint14}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint14_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint14.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheUint16Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheuint16_free(ptr >>> 0, 1));
var FheUint16 = class _FheUint16 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheUint16.prototype);
    obj.__wbg_ptr = ptr;
    FheUint16Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheUint16Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheuint16_free(ptr, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint16}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint16_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint16.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint16}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheuint16_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint16.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint16}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheuint16_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint16.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint10_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return r0;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint16_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint16}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint16_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint16.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint16_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint16}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint16_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint16.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheUint160Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheuint160_free(ptr >>> 0, 1));
var FheUint160 = class _FheUint160 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheUint160.prototype);
    obj.__wbg_ptr = ptr;
    FheUint160Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheUint160Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheuint160_free(ptr, 0);
  }
  /**
  * @param {any} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint160}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint160_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint160.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint160}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheuint160_encrypt_with_public_key(retptr, addHeapObject(value), public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint160.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint160}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheuint160_encrypt_with_compressed_public_key(retptr, addHeapObject(value), compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint160.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {any}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint160_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return takeObject(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint160_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint160}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint160_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint160.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint160_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint160}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint160_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint160.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheUint2Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheuint2_free(ptr >>> 0, 1));
var FheUint2 = class _FheUint2 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheUint2.prototype);
    obj.__wbg_ptr = ptr;
    FheUint2Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheUint2Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheuint2_free(ptr, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint2}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint2_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint2.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint2}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheuint2_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint2.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint2}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheuint2_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint2.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint2_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return r0;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint2_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint2}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint2_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint2.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint2_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint2}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint2_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint2.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheUint2048Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheuint2048_free(ptr >>> 0, 1));
var FheUint2048 = class _FheUint2048 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheUint2048.prototype);
    obj.__wbg_ptr = ptr;
    FheUint2048Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheUint2048Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheuint2048_free(ptr, 0);
  }
  /**
  * @param {any} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint2048}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint2048_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint2048.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint2048}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheuint2048_encrypt_with_public_key(retptr, addHeapObject(value), public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint2048.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint2048}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheuint2048_encrypt_with_compressed_public_key(retptr, addHeapObject(value), compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint2048.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {any}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint2048_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return takeObject(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint2048_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint2048}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint2048_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint2048.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint2048_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint2048}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint2048_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint2048.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheUint256Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheuint256_free(ptr >>> 0, 1));
var FheUint256 = class _FheUint256 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheUint256.prototype);
    obj.__wbg_ptr = ptr;
    FheUint256Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheUint256Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheuint256_free(ptr, 0);
  }
  /**
  * @param {any} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint256}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint256_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint256.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint256}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheuint256_encrypt_with_public_key(retptr, addHeapObject(value), public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint256.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint256}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheuint256_encrypt_with_compressed_public_key(retptr, addHeapObject(value), compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint256.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {any}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint160_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return takeObject(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint256_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint256}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint256_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint256.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint256_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint256}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint256_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint256.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheUint32Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheuint32_free(ptr >>> 0, 1));
var FheUint32 = class _FheUint32 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheUint32.prototype);
    obj.__wbg_ptr = ptr;
    FheUint32Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheUint32Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheuint32_free(ptr, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint32}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint32_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint32.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint32}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheuint32_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint32.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint32}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheuint32_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint32.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint32_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return r0 >>> 0;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint32_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint32}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint32_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint32.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint32_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint32}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint32_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint32.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheUint4Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheuint4_free(ptr >>> 0, 1));
var FheUint4 = class _FheUint4 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheUint4.prototype);
    obj.__wbg_ptr = ptr;
    FheUint4Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheUint4Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheuint4_free(ptr, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint4}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint4_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint4.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint4}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheuint4_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint4.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint4}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheuint4_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint4.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint2_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return r0;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint4_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint4}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint4_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint4.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint4_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint4}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint4_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint4.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheUint512Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheuint512_free(ptr >>> 0, 1));
var FheUint512 = class _FheUint512 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheUint512.prototype);
    obj.__wbg_ptr = ptr;
    FheUint512Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheUint512Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheuint512_free(ptr, 0);
  }
  /**
  * @param {any} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint512}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint512_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint512.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint512}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheuint512_encrypt_with_public_key(retptr, addHeapObject(value), public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint512.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint512}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheuint512_encrypt_with_compressed_public_key(retptr, addHeapObject(value), compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint512.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {any}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint512_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return takeObject(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint512_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint512}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint512_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint512.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint512_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint512}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint512_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint512.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheUint6Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheuint6_free(ptr >>> 0, 1));
var FheUint6 = class _FheUint6 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheUint6.prototype);
    obj.__wbg_ptr = ptr;
    FheUint6Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheUint6Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheuint6_free(ptr, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint6}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint6_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint6.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint6}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheuint6_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint6.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint6}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheuint6_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint6.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint2_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return r0;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint6_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint6}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint6_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint6.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint6_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint6}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint6_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint6.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheUint64Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheuint64_free(ptr >>> 0, 1));
var FheUint64 = class _FheUint64 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheUint64.prototype);
    obj.__wbg_ptr = ptr;
    FheUint64Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheUint64Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheuint64_free(ptr, 0);
  }
  /**
  * @param {bigint} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint64}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint64_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint64.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint64}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheuint64_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint64.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint64}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheuint64_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint64.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {bigint}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint64_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getBigInt64(retptr + 8 * 0, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      return BigInt.asUintN(64, r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint64_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint64}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint64_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint64.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint64_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint64}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint64_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint64.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var FheUint8Finalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_fheuint8_free(ptr >>> 0, 1));
var FheUint8 = class _FheUint8 {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_FheUint8.prototype);
    obj.__wbg_ptr = ptr;
    FheUint8Finalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FheUint8Finalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_fheuint8_free(ptr, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint8}
  */
  static encrypt_with_client_key(value, client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint8_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint8.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint8}
  */
  static encrypt_with_public_key(value, public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfhePublicKey);
      wasm$1.fheuint8_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint8.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint8}
  */
  static encrypt_with_compressed_public_key(value, compressed_public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(compressed_public_key, TfheCompressedPublicKey);
      wasm$1.fheuint8_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint8.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.fheuint2_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return r0;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint8_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint8}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint8_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint8.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.fheuint8_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint8}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.fheuint8_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _FheUint8.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var ProvenCompactCiphertextListFinalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_provencompactciphertextlist_free(ptr >>> 0, 1));
var ProvenCompactCiphertextList = class _ProvenCompactCiphertextList {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_ProvenCompactCiphertextList.prototype);
    obj.__wbg_ptr = ptr;
    ProvenCompactCiphertextListFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ProvenCompactCiphertextListFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_provencompactciphertextlist_free(ptr, 0);
  }
  /**
  * @param {TfheCompactPublicKey} public_key
  * @returns {CompactCiphertextListBuilder}
  */
  static builder(public_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_key, TfheCompactPublicKey);
      wasm$1.provencompactciphertextlist_builder(retptr, public_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CompactCiphertextListBuilder.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {number}
  */
  len() {
    const ret = wasm$1.provencompactciphertextlist_len(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
  * @returns {boolean}
  */
  is_empty() {
    const ret = wasm$1.provencompactciphertextlist_is_empty(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
  * @param {number} index
  * @returns {FheTypes | undefined}
  */
  get_kind_of(index) {
    const ret = wasm$1.provencompactciphertextlist_get_kind_of(this.__wbg_ptr, index);
    return ret === 30 ? void 0 : ret;
  }
  /**
  * @param {CompactPkePublicParams} public_params
  * @param {TfheCompactPublicKey} public_key
  * @param {Uint8Array} metadata
  * @returns {CompactCiphertextListExpander}
  */
  verify_and_expand(public_params, public_key, metadata) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(public_params, CompactPkePublicParams);
      _assertClass$1(public_key, TfheCompactPublicKey);
      const ptr0 = passArray8ToWasm0$1(metadata, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.provencompactciphertextlist_verify_and_expand(retptr, this.__wbg_ptr, public_params.__wbg_ptr, public_key.__wbg_ptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CompactCiphertextListExpander.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {CompactCiphertextListExpander}
  */
  expand_without_verification() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.provencompactciphertextlist_expand_without_verification(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CompactCiphertextListExpander.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.provencompactciphertextlist_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {ProvenCompactCiphertextList}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.provencompactciphertextlist_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _ProvenCompactCiphertextList.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.provencompactciphertextlist_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {ProvenCompactCiphertextList}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.provencompactciphertextlist_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _ProvenCompactCiphertextList.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_shortint_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_shortintciphertext_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_shortintclientkey_free(ptr >>> 0, 1));
var ShortintCompactPublicKeyEncryptionParametersFinalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_shortintcompactpublickeyencryptionparameters_free(ptr >>> 0, 1));
var ShortintCompactPublicKeyEncryptionParameters = class _ShortintCompactPublicKeyEncryptionParameters {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_ShortintCompactPublicKeyEncryptionParameters.prototype);
    obj.__wbg_ptr = ptr;
    ShortintCompactPublicKeyEncryptionParametersFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ShortintCompactPublicKeyEncryptionParametersFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_shortintcompactpublickeyencryptionparameters_free(ptr, 0);
  }
  /**
  * @param {ShortintCompactPublicKeyEncryptionParametersName} name
  */
  constructor(name) {
    const ret = wasm$1.shortintcompactpublickeyencryptionparameters_new(name);
    this.__wbg_ptr = ret >>> 0;
    ShortintCompactPublicKeyEncryptionParametersFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
  * @param {number} encryption_lwe_dimension
  * @param {ShortintNoiseDistribution} encryption_noise_distribution
  * @param {number} message_modulus
  * @param {number} carry_modulus
  * @param {number} modulus_power_of_2_exponent
  * @param {number} ks_base_log
  * @param {number} ks_level
  * @param {ShortintEncryptionKeyChoice} encryption_key_choice
  * @returns {ShortintCompactPublicKeyEncryptionParameters}
  */
  static new_parameters(encryption_lwe_dimension, encryption_noise_distribution, message_modulus, carry_modulus, modulus_power_of_2_exponent, ks_base_log, ks_level, encryption_key_choice) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(encryption_noise_distribution, ShortintNoiseDistribution);
      wasm$1.shortintcompactpublickeyencryptionparameters_new_parameters(retptr, encryption_lwe_dimension, encryption_noise_distribution.__wbg_ptr, message_modulus, carry_modulus, modulus_power_of_2_exponent, ks_base_log, ks_level, encryption_key_choice);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _ShortintCompactPublicKeyEncryptionParameters.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_shortintcompressedciphertext_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_shortintcompressedpublickey_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_shortintcompressedserverkey_free(ptr >>> 0, 1));
var ShortintNoiseDistributionFinalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_shortintnoisedistribution_free(ptr >>> 0, 1));
var ShortintNoiseDistribution = class _ShortintNoiseDistribution {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_ShortintNoiseDistribution.prototype);
    obj.__wbg_ptr = ptr;
    ShortintNoiseDistributionFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ShortintNoiseDistributionFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_shortintnoisedistribution_free(ptr, 0);
  }
};
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_shortintparameters_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_shortintpublickey_free(ptr >>> 0, 1));
var TfheClientKeyFinalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_tfheclientkey_free(ptr >>> 0, 1));
var TfheClientKey = class _TfheClientKey {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_TfheClientKey.prototype);
    obj.__wbg_ptr = ptr;
    TfheClientKeyFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    TfheClientKeyFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_tfheclientkey_free(ptr, 0);
  }
  /**
  * @param {TfheConfig} config
  * @returns {TfheClientKey}
  */
  static generate(config) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(config, TfheConfig);
      wasm$1.tfheclientkey_generate(retptr, config.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _TfheClientKey.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheConfig} config
  * @param {any} seed
  * @returns {TfheClientKey}
  */
  static generate_with_seed(config, seed) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(config, TfheConfig);
      wasm$1.tfheclientkey_generate_with_seed(retptr, config.__wbg_ptr, addHeapObject(seed));
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _TfheClientKey.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.tfheclientkey_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {TfheClientKey}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.tfheclientkey_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _TfheClientKey.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.tfheclientkey_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {TfheClientKey}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.tfheclientkey_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _TfheClientKey.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var TfheCompactPublicKeyFinalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_tfhecompactpublickey_free(ptr >>> 0, 1));
var TfheCompactPublicKey = class _TfheCompactPublicKey {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_TfheCompactPublicKey.prototype);
    obj.__wbg_ptr = ptr;
    TfheCompactPublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    TfheCompactPublicKeyFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_tfhecompactpublickey_free(ptr, 0);
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {TfheCompactPublicKey}
  */
  static new(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.tfhecompactpublickey_new(retptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _TfheCompactPublicKey.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.tfhecompactpublickey_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {TfheCompactPublicKey}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.tfhecompactpublickey_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _TfheCompactPublicKey.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.tfhecompactpublickey_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {TfheCompactPublicKey}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.tfhecompactpublickey_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _TfheCompactPublicKey.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @param {ShortintCompactPublicKeyEncryptionParameters} conformance_params
  * @returns {TfheCompactPublicKey}
  */
  static safe_deserialize_conformant(buffer, serialized_size_limit, conformance_params) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      _assertClass$1(conformance_params, ShortintCompactPublicKeyEncryptionParameters);
      wasm$1.tfhecompactpublickey_safe_deserialize_conformant(retptr, ptr0, len0, serialized_size_limit, conformance_params.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _TfheCompactPublicKey.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_tfhecompressedcompactpublickey_free(ptr >>> 0, 1));
var TfheCompressedPublicKeyFinalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_tfhecompressedpublickey_free(ptr >>> 0, 1));
var TfheCompressedPublicKey = class _TfheCompressedPublicKey {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_TfheCompressedPublicKey.prototype);
    obj.__wbg_ptr = ptr;
    TfheCompressedPublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    TfheCompressedPublicKeyFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_tfhecompressedpublickey_free(ptr, 0);
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {TfheCompressedPublicKey}
  */
  static new(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.tfhecompressedpublickey_new(retptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _TfheCompressedPublicKey.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {TfhePublicKey}
  */
  decompress() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.tfhecompressedpublickey_decompress(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return TfhePublicKey.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.tfhecompressedpublickey_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {TfheCompressedPublicKey}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.tfhecompressedpublickey_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _TfheCompressedPublicKey.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.tfhecompressedpublickey_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {TfheCompressedPublicKey}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.tfhecompressedpublickey_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _TfheCompressedPublicKey.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_tfhecompressedserverkey_free(ptr >>> 0, 1));
var TfheConfigFinalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_tfheconfig_free(ptr >>> 0, 1));
var TfheConfig = class _TfheConfig {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_TfheConfig.prototype);
    obj.__wbg_ptr = ptr;
    TfheConfigFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    TfheConfigFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_tfheconfig_free(ptr, 0);
  }
};
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_tfheconfigbuilder_free(ptr >>> 0, 1));
var TfhePublicKeyFinalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_tfhepublickey_free(ptr >>> 0, 1));
var TfhePublicKey = class _TfhePublicKey {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_TfhePublicKey.prototype);
    obj.__wbg_ptr = ptr;
    TfhePublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    TfhePublicKeyFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_tfhepublickey_free(ptr, 0);
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {TfhePublicKey}
  */
  static new(client_key) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      _assertClass$1(client_key, TfheClientKey);
      wasm$1.tfhepublickey_new(retptr, client_key.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _TfhePublicKey.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.tfhepublickey_serialize(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {TfhePublicKey}
  */
  static deserialize(buffer) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.tfhepublickey_deserialize(retptr, ptr0, len0);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _TfhePublicKey.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      wasm$1.tfhepublickey_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0$1().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0$1(r0, r1).slice();
      wasm$1.__wbindgen_free(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {TfhePublicKey}
  */
  static safe_deserialize(buffer, serialized_size_limit) {
    try {
      const retptr = wasm$1.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0$1(buffer, wasm$1.__wbindgen_malloc);
      const len0 = WASM_VECTOR_LEN$1;
      wasm$1.tfhepublickey_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
      var r0 = getDataViewMemory0$1().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0$1().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0$1().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _TfhePublicKey.__wrap(r0);
    } finally {
      wasm$1.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_tfheserverkey_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_tfhe_free(ptr >>> 0, 1));
var wbg_rayon_PoolBuilderFinalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_wbg_rayon_poolbuilder_free(ptr >>> 0, 1));
var wbg_rayon_PoolBuilder = class _wbg_rayon_PoolBuilder {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_wbg_rayon_PoolBuilder.prototype);
    obj.__wbg_ptr = ptr;
    wbg_rayon_PoolBuilderFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    wbg_rayon_PoolBuilderFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm$1.__wbg_wbg_rayon_poolbuilder_free(ptr, 0);
  }
  /**
  * @returns {number}
  */
  numThreads() {
    const ret = wasm$1.wbg_rayon_poolbuilder_numThreads(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
  * @returns {number}
  */
  receiver() {
    const ret = wasm$1.wbg_rayon_poolbuilder_receiver(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
  */
  build() {
    wasm$1.wbg_rayon_poolbuilder_build(this.__wbg_ptr);
  }
};
function __wbg_load$1(module2, imports) {
  return __async(this, null, function* () {
    if (typeof Response === "function" && module2 instanceof Response) {
      if (typeof WebAssembly.instantiateStreaming === "function") {
        try {
          return yield WebAssembly.instantiateStreaming(module2, imports);
        } catch (e) {
          if (module2.headers.get("Content-Type") != "application/wasm") {
            console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
          } else {
            throw e;
          }
        }
      }
      const bytes = yield module2.arrayBuffer();
      return yield WebAssembly.instantiate(bytes, imports);
    } else {
      const instance = yield WebAssembly.instantiate(module2, imports);
      if (instance instanceof WebAssembly.Instance) {
        return {
          instance,
          module: module2
        };
      } else {
        return instance;
      }
    }
  });
}
function __wbg_get_imports$1() {
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbindgen_number_new = function(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
  };
  imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
    const ret = new Error(getStringFromWasm0$1(arg0, arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_bigint_from_u64 = function(arg0) {
    const ret = BigInt.asUintN(64, arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_shr = function(arg0, arg1) {
    const ret = getObject(arg0) >> getObject(arg1);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_jsval_eq = function(arg0, arg1) {
    const ret = getObject(arg0) === getObject(arg1);
    return ret;
  };
  imports.wbg.__wbindgen_lt = function(arg0, arg1) {
    const ret = getObject(arg0) < getObject(arg1);
    return ret;
  };
  imports.wbg.__wbindgen_neg = function(arg0) {
    const ret = -getObject(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_bigint_from_str = function(arg0, arg1) {
    const ret = BigInt(getStringFromWasm0$1(arg0, arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_bit_and = function(arg0, arg1) {
    const ret = getObject(arg0) & getObject(arg1);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_bigint_from_i128 = function(arg0, arg1) {
    const ret = arg0 << BigInt(64) | BigInt.asUintN(64, arg1);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_bigint_from_i64 = function(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_ge = function(arg0, arg1) {
    const ret = getObject(arg0) >= getObject(arg1);
    return ret;
  };
  imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_bigint_from_u128 = function(arg0, arg1) {
    const ret = BigInt.asUintN(64, arg0) << BigInt(64) | BigInt.asUintN(64, arg1);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_shl = function(arg0, arg1) {
    const ret = getObject(arg0) << getObject(arg1);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_bit_or = function(arg0, arg1) {
    const ret = getObject(arg0) | getObject(arg1);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_abda76e883ba8a5f = function() {
    const ret = new Error();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_stack_658279fe44541cf6 = function(arg0, arg1) {
    const ret = getObject(arg1).stack;
    const ptr1 = passStringToWasm0$1(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN$1;
    getDataViewMemory0$1().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0$1().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_error_f851667af71bcfc6 = function(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
      deferred0_0 = arg0;
      deferred0_1 = arg1;
      console.error(getStringFromWasm0$1(arg0, arg1));
    } finally {
      wasm$1.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
  };
  imports.wbg.__wbg_crypto_1d1f22824a6a080c = function(arg0) {
    const ret = getObject(arg0).crypto;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_is_object = function(arg0) {
    const val = getObject(arg0);
    const ret = typeof val === "object" && val !== null;
    return ret;
  };
  imports.wbg.__wbg_process_4a72847cc503995b = function(arg0) {
    const ret = getObject(arg0).process;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_versions_f686565e586dd935 = function(arg0) {
    const ret = getObject(arg0).versions;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_node_104a2ff8d6ea03a2 = function(arg0) {
    const ret = getObject(arg0).node;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_is_string = function(arg0) {
    const ret = typeof getObject(arg0) === "string";
    return ret;
  };
  imports.wbg.__wbg_require_cca90b1a94a0255b = function() {
    return handleError$1(function() {
      const ret = module.require;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbindgen_is_function = function(arg0) {
    const ret = typeof getObject(arg0) === "function";
    return ret;
  };
  imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
    const ret = getStringFromWasm0$1(arg0, arg1);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_msCrypto_eb05e62b530a1508 = function(arg0) {
    const ret = getObject(arg0).msCrypto;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_randomFillSync_5c9c955aa56b6049 = function() {
    return handleError$1(function(arg0, arg1) {
      getObject(arg0).randomFillSync(takeObject(arg1));
    }, arguments);
  };
  imports.wbg.__wbg_getRandomValues_3aa56aa6edec874c = function() {
    return handleError$1(function(arg0, arg1) {
      getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments);
  };
  imports.wbg.__wbg_instanceof_Window_5012736c80a01584 = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof Window;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_BigInt_c180ff1ada0e172c = function(arg0) {
    const ret = BigInt(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_newnoargs_76313bd6ff35d0f2 = function(arg0, arg1) {
    const ret = new Function(getStringFromWasm0$1(arg0, arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_call_1084a111329e68ce = function() {
    return handleError$1(function(arg0, arg1) {
      const ret = getObject(arg0).call(getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof obj === "string" ? obj : void 0;
    var ptr1 = isLikeNone$1(ret) ? 0 : passStringToWasm0$1(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN$1;
    getDataViewMemory0$1().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0$1().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_self_3093d5d1f7bcb682 = function() {
    return handleError$1(function() {
      const ret = self.self;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_window_3bcfc4d31bc012f8 = function() {
    return handleError$1(function() {
      const ret = window.window;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_globalThis_86b222e13bdf32ed = function() {
    return handleError$1(function() {
      const ret = globalThis.globalThis;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_global_e5a3fe56f8be9485 = function() {
    return handleError$1(function() {
      const ret = global$1.global;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbindgen_is_undefined = function(arg0) {
    const ret = getObject(arg0) === void 0;
    return ret;
  };
  imports.wbg.__wbg_BigInt_38f8da7386bbae76 = function() {
    return handleError$1(function(arg0) {
      const ret = BigInt(getObject(arg0));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_toString_515790fe476e2613 = function(arg0, arg1, arg2) {
    const ret = getObject(arg1).toString(arg2);
    const ptr1 = passStringToWasm0$1(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN$1;
    getDataViewMemory0$1().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0$1().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_toString_9d18e102ca933e68 = function(arg0) {
    const ret = getObject(arg0).toString();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_call_89af060b4e1523f2 = function() {
    return handleError$1(function(arg0, arg1, arg2) {
      const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_getTime_91058879093a1589 = function(arg0) {
    const ret = getObject(arg0).getTime();
    return ret;
  };
  imports.wbg.__wbg_new0_65387337a95cf44d = function() {
    const ret = /* @__PURE__ */ new Date();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_buffer_b7b08af79b0b0974 = function(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_newwithbyteoffsetandlength_8a2cb9ca96b27ec9 = function(arg0, arg1, arg2) {
    const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_ea1883e1e5e86686 = function(arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_set_d1e79e2388520f18 = function(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
  };
  imports.wbg.__wbg_newwithlength_ec548f448387c968 = function(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_subarray_7c2e3576afe181d1 = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_bigint_get_as_i64 = function(arg0, arg1) {
    const v = getObject(arg1);
    const ret = typeof v === "bigint" ? v : void 0;
    getDataViewMemory0$1().setBigInt64(arg0 + 8 * 1, isLikeNone$1(ret) ? BigInt(0) : ret, true);
    getDataViewMemory0$1().setInt32(arg0 + 4 * 0, !isLikeNone$1(ret), true);
  };
  imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
    const ret = debugString$1(getObject(arg1));
    const ptr1 = passStringToWasm0$1(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN$1;
    getDataViewMemory0$1().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0$1().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0$1(arg0, arg1));
  };
  imports.wbg.__wbindgen_module = function() {
    const ret = __wbg_init$1.__wbindgen_wasm_module;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_memory = function() {
    const ret = wasm$1.memory;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_startWorkers_d587c7d659590d3c = function(arg0, arg1, arg2) {
    const ret = startWorkers(takeObject(arg0), takeObject(arg1), wbg_rayon_PoolBuilder.__wrap(arg2));
    return addHeapObject(ret);
  };
  return imports;
}
function __wbg_init_memory(imports, memory) {
  imports.wbg.memory = memory || new WebAssembly.Memory({
    initial: 19,
    maximum: 16384,
    shared: true
  });
}
function __wbg_finalize_init$1(instance, module2, thread_stack_size) {
  wasm$1 = instance.exports;
  __wbg_init$1.__wbindgen_wasm_module = module2;
  cachedDataViewMemory0$1 = null;
  cachedUint8ArrayMemory0$1 = null;
  if (typeof thread_stack_size !== "undefined" && (typeof thread_stack_size !== "number" || thread_stack_size === 0 || thread_stack_size % 65536 !== 0)) {
    throw "invalid stack size";
  }
  wasm$1.__wbindgen_start(thread_stack_size);
  return wasm$1;
}
function __wbg_init$1(module_or_path, memory) {
  return __async(this, null, function* () {
    if (wasm$1 !== void 0) return wasm$1;
    let thread_stack_size;
    if (typeof module_or_path !== "undefined" && Object.getPrototypeOf(module_or_path) === Object.prototype) ({
      module_or_path,
      memory,
      thread_stack_size
    } = module_or_path);
    else console.warn("using deprecated parameters for the initialization function; pass a single object instead");
    if (typeof module_or_path === "undefined") {
      module_or_path = new URL("tfhe_bg.wasm", import.meta.url);
    }
    const imports = __wbg_get_imports$1();
    if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {
      module_or_path = fetch(module_or_path);
    }
    __wbg_init_memory(imports, memory);
    const {
      instance,
      module: module2
    } = yield __wbg_load$1(yield module_or_path, imports);
    return __wbg_finalize_init$1(instance, module2, thread_stack_size);
  });
}
var SERIALIZED_SIZE_LIMIT_CIPHERTEXT = BigInt(1024 * 1024 * 512);
var SERIALIZED_SIZE_LIMIT_PK = BigInt(1024 * 1024 * 512);
var SERIALIZED_SIZE_LIMIT_CRS = BigInt(1024 * 1024 * 512);
var cleanURL = (url) => {
  if (!url) return "";
  return new URL(url).href;
};
var numberToHex = (num) => {
  let hex = num.toString(16);
  return hex.length % 2 ? "0" + hex : hex;
};
var fromHexString = (hexString) => {
  const arr = hexString.replace(/^(0x)/, "").match(/.{1,2}/g);
  if (!arr) return new Uint8Array();
  return Uint8Array.from(arr.map((byte) => parseInt(byte, 16)));
};
var toHexString = (bytes) => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
var bytesToBigInt = function(byteArray) {
  if (!byteArray || byteArray?.length === 0) {
    return BigInt(0);
  }
  const buffer = Buffer.from(byteArray);
  const result = (0, import_bigint_buffer.toBigIntBE)(buffer);
  return result;
};
var keyurlCache = {};
var getKeysFromGateway = (url, publicKeyId) => __async(null, null, function* () {
  if (keyurlCache[url]) {
    return keyurlCache[url];
  }
  try {
    const response = yield fetch(`${url}keyurl`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = yield response.json();
    if (data) {
      let pubKeyUrl;
      if (!publicKeyId) {
        pubKeyUrl = data.response.fhe_key_info[0].fhe_public_key.urls[0];
        publicKeyId = data.response.fhe_key_info[0].fhe_public_key.data_id;
      } else {
        const keyInfo = data.response.fhe_key_info.find((info) => info.fhe_public_key.data_id === publicKeyId);
        if (!keyInfo) {
          throw new Error(`Could not find FHE key info with data_id ${publicKeyId}`);
        }
        pubKeyUrl = keyInfo.fhe_public_key.urls[0];
      }
      const publicKeyResponse = yield fetch(pubKeyUrl);
      const publicKey = yield publicKeyResponse.arrayBuffer();
      const publicParamsUrl = data.response.crs["2048"].urls[0];
      const publicParamsId = data.response.crs["2048"].data_id;
      const publicParams2048 = yield (yield fetch(publicParamsUrl)).arrayBuffer();
      const result = {
        publicKey: TfheCompactPublicKey.safe_deserialize(new Uint8Array(publicKey), SERIALIZED_SIZE_LIMIT_PK),
        publicKeyId,
        publicParams: {
          2048: {
            publicParams: CompactPkePublicParams.safe_deserialize(new Uint8Array(publicParams2048), SERIALIZED_SIZE_LIMIT_CRS),
            publicParamsId
          }
        }
      };
      keyurlCache[url] = result;
      return result;
    } else {
      throw new Error("No public key available");
    }
  } catch (e) {
    throw new Error("Impossible to fetch public key: wrong gateway url.", {
      cause: e
    });
  }
});
var abi = [{
  inputs: [],
  stateMutability: "nonpayable",
  type: "constructor"
}, {
  inputs: [{
    internalType: "address",
    name: "target",
    type: "address"
  }],
  name: "AddressEmptyCode",
  type: "error"
}, {
  inputs: [],
  name: "ECDSAInvalidSignature",
  type: "error"
}, {
  inputs: [{
    internalType: "uint256",
    name: "length",
    type: "uint256"
  }],
  name: "ECDSAInvalidSignatureLength",
  type: "error"
}, {
  inputs: [{
    internalType: "bytes32",
    name: "s",
    type: "bytes32"
  }],
  name: "ECDSAInvalidSignatureS",
  type: "error"
}, {
  inputs: [{
    internalType: "address",
    name: "implementation",
    type: "address"
  }],
  name: "ERC1967InvalidImplementation",
  type: "error"
}, {
  inputs: [],
  name: "ERC1967NonPayable",
  type: "error"
}, {
  inputs: [],
  name: "FailedInnerCall",
  type: "error"
}, {
  inputs: [],
  name: "InvalidInitialization",
  type: "error"
}, {
  inputs: [],
  name: "NotInitializing",
  type: "error"
}, {
  inputs: [{
    internalType: "address",
    name: "owner",
    type: "address"
  }],
  name: "OwnableInvalidOwner",
  type: "error"
}, {
  inputs: [{
    internalType: "address",
    name: "account",
    type: "address"
  }],
  name: "OwnableUnauthorizedAccount",
  type: "error"
}, {
  inputs: [],
  name: "UUPSUnauthorizedCallContext",
  type: "error"
}, {
  inputs: [{
    internalType: "bytes32",
    name: "slot",
    type: "bytes32"
  }],
  name: "UUPSUnsupportedProxiableUUID",
  type: "error"
}, {
  anonymous: false,
  inputs: [],
  name: "EIP712DomainChanged",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    internalType: "uint64",
    name: "version",
    type: "uint64"
  }],
  name: "Initialized",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "address",
    name: "previousOwner",
    type: "address"
  }, {
    indexed: true,
    internalType: "address",
    name: "newOwner",
    type: "address"
  }],
  name: "OwnershipTransferStarted",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "address",
    name: "previousOwner",
    type: "address"
  }, {
    indexed: true,
    internalType: "address",
    name: "newOwner",
    type: "address"
  }],
  name: "OwnershipTransferred",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "address",
    name: "signer",
    type: "address"
  }],
  name: "SignerAdded",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "address",
    name: "signer",
    type: "address"
  }],
  name: "SignerRemoved",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "address",
    name: "implementation",
    type: "address"
  }],
  name: "Upgraded",
  type: "event"
}, {
  inputs: [],
  name: "UPGRADE_INTERFACE_VERSION",
  outputs: [{
    internalType: "string",
    name: "",
    type: "string"
  }],
  stateMutability: "view",
  type: "function"
}, {
  inputs: [],
  name: "acceptOwnership",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "signer",
    type: "address"
  }],
  name: "addSigner",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [],
  name: "eip712Domain",
  outputs: [{
    internalType: "bytes1",
    name: "fields",
    type: "bytes1"
  }, {
    internalType: "string",
    name: "name",
    type: "string"
  }, {
    internalType: "string",
    name: "version",
    type: "string"
  }, {
    internalType: "uint256",
    name: "chainId",
    type: "uint256"
  }, {
    internalType: "address",
    name: "verifyingContract",
    type: "address"
  }, {
    internalType: "bytes32",
    name: "salt",
    type: "bytes32"
  }, {
    internalType: "uint256[]",
    name: "extensions",
    type: "uint256[]"
  }],
  stateMutability: "view",
  type: "function"
}, {
  inputs: [],
  name: "getSigners",
  outputs: [{
    internalType: "address[]",
    name: "",
    type: "address[]"
  }],
  stateMutability: "view",
  type: "function"
}, {
  inputs: [],
  name: "getThreshold",
  outputs: [{
    internalType: "uint256",
    name: "",
    type: "uint256"
  }],
  stateMutability: "view",
  type: "function"
}, {
  inputs: [],
  name: "getVersion",
  outputs: [{
    internalType: "string",
    name: "",
    type: "string"
  }],
  stateMutability: "pure",
  type: "function"
}, {
  inputs: [],
  name: "get_DECRYPTIONRESULT_TYPE",
  outputs: [{
    internalType: "string",
    name: "",
    type: "string"
  }],
  stateMutability: "view",
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "initialOwner",
    type: "address"
  }],
  name: "initialize",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "account",
    type: "address"
  }],
  name: "isSigner",
  outputs: [{
    internalType: "bool",
    name: "",
    type: "bool"
  }],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [],
  name: "owner",
  outputs: [{
    internalType: "address",
    name: "",
    type: "address"
  }],
  stateMutability: "view",
  type: "function"
}, {
  inputs: [],
  name: "pendingOwner",
  outputs: [{
    internalType: "address",
    name: "",
    type: "address"
  }],
  stateMutability: "view",
  type: "function"
}, {
  inputs: [],
  name: "proxiableUUID",
  outputs: [{
    internalType: "bytes32",
    name: "",
    type: "bytes32"
  }],
  stateMutability: "view",
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "signer",
    type: "address"
  }],
  name: "removeSigner",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [],
  name: "renounceOwnership",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "newOwner",
    type: "address"
  }],
  name: "transferOwnership",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "newImplementation",
    type: "address"
  }, {
    internalType: "bytes",
    name: "data",
    type: "bytes"
  }],
  name: "upgradeToAndCall",
  outputs: [],
  stateMutability: "payable",
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "aclAddress",
    type: "address"
  }, {
    internalType: "uint256[]",
    name: "handlesList",
    type: "uint256[]"
  }, {
    internalType: "bytes",
    name: "decryptedResult",
    type: "bytes"
  }, {
    internalType: "bytes[]",
    name: "signatures",
    type: "bytes[]"
  }],
  name: "verifySignatures",
  outputs: [{
    internalType: "bool",
    name: "",
    type: "bool"
  }],
  stateMutability: "nonpayable",
  type: "function"
}];
var getProvider = (config) => {
  if (config.networkUrl) {
    return new JsonRpcProvider(config.networkUrl);
  } else if (config.network) {
    return new BrowserProvider(config.network);
  }
  throw new Error("You must provide a network URL or a EIP1193 object (eg: window.ethereum)");
};
var getChainId = (provider, config) => __async(null, null, function* () {
  if (config.chainId && typeof config.chainId === "number") {
    return config.chainId;
  } else if (config.chainId && typeof config.chainId !== "number") {
    throw new Error("chainId must be a number.");
  } else {
    const chainId = (yield provider.getNetwork()).chainId;
    return Number(chainId);
  }
});
var getTfheCompactPublicKey = (config) => __async(null, null, function* () {
  if (config.gatewayUrl && !config.publicKey) {
    const inputs = yield getKeysFromGateway(cleanURL(config.gatewayUrl), config.publicKeyId);
    return {
      publicKey: inputs.publicKey,
      publicKeyId: inputs.publicKeyId
    };
  } else if (config.publicKey && config.publicKeyId) {
    const buff = config.publicKey;
    try {
      return {
        publicKey: TfheCompactPublicKey.safe_deserialize(buff, SERIALIZED_SIZE_LIMIT_PK),
        publicKeyId: config.publicKeyId
      };
    } catch (e) {
      throw new Error("Invalid public key (deserialization failed)", {
        cause: e
      });
    }
  } else {
    throw new Error("You must provide a public key with its public key ID.");
  }
});
var getPublicParams = (config) => __async(null, null, function* () {
  if (config.gatewayUrl && !config.publicParams) {
    const inputs = yield getKeysFromGateway(cleanURL(config.gatewayUrl), config.publicKeyId);
    return inputs.publicParams;
  } else if (config.publicParams && config.publicParams["2048"]) {
    const buff = config.publicParams["2048"].publicParams;
    try {
      return {
        2048: {
          publicParams: CompactPkePublicParams.safe_deserialize(buff, SERIALIZED_SIZE_LIMIT_CRS),
          publicParamsId: config.publicParams["2048"].publicParamsId
        }
      };
    } catch (e) {
      throw new Error("Invalid public key (deserialization failed)", {
        cause: e
      });
    }
  } else {
    throw new Error("You must provide a valid CRS with its CRS ID.");
  }
});
var getKMSSigners = (provider, config) => __async(null, null, function* () {
  const kmsContract = new Contract(config.kmsContractAddress, abi, provider);
  const signers = yield kmsContract.getSigners();
  return signers;
});
var checkEncryptedValue = (value, bits) => {
  if (value == null) throw new Error("Missing value");
  let limit;
  if (bits >= 8) {
    limit = BigInt(`0x${new Array(bits / 8).fill(null).reduce((v) => `${v}ff`, "")}`);
  } else {
    limit = BigInt(2 ** bits - 1);
  }
  if (typeof value !== "number" && typeof value !== "bigint") throw new Error("Value must be a number or a bigint.");
  if (value > limit) {
    throw new Error(`The value exceeds the limit for ${bits}bits integer (${limit.toString()}).`);
  }
};
var createEncryptedInput = (aclContractAddress, chainId, gateway, tfheCompactPublicKey, publicKeyId, publicParams) => (contractAddress, callerAddress) => {
  if (!isAddress(contractAddress)) {
    throw new Error("Contract address is not a valid address.");
  }
  if (!isAddress(callerAddress)) {
    throw new Error("User address is not a valid address.");
  }
  const publicKey = tfheCompactPublicKey;
  const bits = [];
  const builder = CompactCiphertextList.builder(publicKey);
  const checkLimit = (added) => {
    if (bits.reduce((acc, val) => acc + Math.max(2, val), 0) + added > 2048) {
      throw Error("Packing more than 2048 bits in a single input ciphertext is unsupported");
    }
    if (bits.length + 1 > 256) throw Error("Packing more than 256 variables in a single input ciphertext is unsupported");
  };
  return {
    addBool(value) {
      if (value == null) throw new Error("Missing value");
      if (typeof value !== "boolean" && typeof value !== "number" && typeof value !== "bigint") throw new Error("The value must be a boolean, a number or a bigint.");
      if ((typeof value !== "bigint" || typeof value !== "number") && Number(value) > 1) throw new Error("The value must be 1 or 0.");
      checkEncryptedValue(Number(value), 1);
      checkLimit(2);
      builder.push_boolean(!!value);
      bits.push(1);
      return this;
    },
    add4(value) {
      checkEncryptedValue(value, 4);
      checkLimit(4);
      builder.push_u4(Number(value));
      bits.push(4);
      return this;
    },
    add8(value) {
      checkEncryptedValue(value, 8);
      checkLimit(8);
      builder.push_u8(Number(value));
      bits.push(8);
      return this;
    },
    add16(value) {
      checkEncryptedValue(value, 16);
      checkLimit(16);
      builder.push_u16(Number(value));
      bits.push(16);
      return this;
    },
    add32(value) {
      checkEncryptedValue(value, 32);
      checkLimit(32);
      builder.push_u32(Number(value));
      bits.push(32);
      return this;
    },
    add64(value) {
      checkEncryptedValue(value, 64);
      checkLimit(64);
      builder.push_u64(BigInt(value));
      bits.push(64);
      return this;
    },
    add128(value) {
      checkEncryptedValue(value, 128);
      checkLimit(128);
      builder.push_u128(BigInt(value));
      bits.push(128);
      return this;
    },
    addAddress(value) {
      if (!isAddress(value)) {
        throw new Error("The value must be a valid address.");
      }
      checkLimit(160);
      builder.push_u160(BigInt(value));
      bits.push(160);
      return this;
    },
    add256(value) {
      checkEncryptedValue(value, 256);
      checkLimit(256);
      builder.push_u256(BigInt(value));
      bits.push(256);
      return this;
    },
    addBytes64(value) {
      if (value.length !== 64) throw Error("Uncorrect length of input Uint8Array, should be 64 for an ebytes64");
      const bigIntValue = bytesToBigInt(value);
      checkEncryptedValue(bigIntValue, 512);
      checkLimit(512);
      builder.push_u512(bigIntValue);
      bits.push(512);
      return this;
    },
    addBytes128(value) {
      if (value.length !== 128) throw Error("Uncorrect length of input Uint8Array, should be 128 for an ebytes128");
      const bigIntValue = bytesToBigInt(value);
      checkEncryptedValue(bigIntValue, 1024);
      checkLimit(1024);
      builder.push_u1024(bigIntValue);
      bits.push(1024);
      return this;
    },
    addBytes256(value) {
      if (value.length !== 256) throw Error("Uncorrect length of input Uint8Array, should be 256 for an ebytes256");
      const bigIntValue = bytesToBigInt(value);
      checkEncryptedValue(bigIntValue, 2048);
      checkLimit(2048);
      builder.push_u2048(bigIntValue);
      bits.push(2048);
      return this;
    },
    getBits() {
      return bits;
    },
    _getClosestPP() {
      const getKeys = (obj) => Object.keys(obj);
      const totalBits = bits.reduce((total, v) => total + v, 0);
      const ppTypes = getKeys(publicParams);
      const closestPP = ppTypes.find((k) => Number(k) >= totalBits);
      if (!closestPP) {
        throw new Error(`Too many bits in provided values. Maximum is ${ppTypes[ppTypes.length - 1]}.`);
      }
      return closestPP;
    },
    _prove() {
      return __async(this, null, function* () {
        const closestPP = this._getClosestPP();
        const pp = publicParams[closestPP].publicParams;
        const buffContract = fromHexString(contractAddress);
        const buffUser = fromHexString(callerAddress);
        const buffAcl = fromHexString(aclContractAddress);
        const buffChainId = fromHexString(chainId.toString(16));
        const auxData = new Uint8Array(buffContract.length + buffUser.length + buffAcl.length + 32);
        auxData.set(buffContract, 0);
        auxData.set(buffUser, 20);
        auxData.set(buffAcl, 40);
        auxData.set(buffChainId, auxData.length - buffChainId.length);
        const encrypted = builder.build_with_proof_packed(pp, auxData, ZkComputeLoad.Verify);
        const ciphertext = Buffer.from(encrypted.safe_serialize(SERIALIZED_SIZE_LIMIT_CIPHERTEXT));
        return ciphertext;
      });
    },
    _verify(ciphertext) {
      return __async(this, null, function* () {
        const closestPP = this._getClosestPP();
        const ppId = publicParams[closestPP].publicParamsId;
        const payload = {
          contract_address: getAddress(contractAddress),
          caller_address: getAddress(callerAddress),
          ct_proof: ciphertext.toString("hex"),
          key_id: publicKeyId,
          crs_id: ppId
        };
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        };
        let json;
        try {
          const response = yield fetch(`${gateway}verify_proven_ct`, options);
          json = yield response.json();
        } catch (e) {
          throw new Error("Gateway didn't response correctly", {
            cause: e
          });
        }
        let handles = [];
        if (json.response.handles && json.response.handles.length > 0) {
          handles = json.response.handles.map(fromHexString);
        }
        const kmsSignatures = json.response.kms_signatures;
        let inputProof = numberToHex(handles.length);
        const numSigners = kmsSignatures.length;
        inputProof += numberToHex(numSigners);
        if (json.response.proof_of_storage) {
          const hash = (0, import_keccak.default)("keccak256").update(Buffer.from(ciphertext)).digest();
          inputProof += hash.toString("hex");
          const listHandlesStr = handles.map((i) => toHexString(i));
          listHandlesStr.map((handle) => inputProof += handle);
          inputProof += json.response.proof_of_storage;
          kmsSignatures.map((sigKMS) => inputProof += sigKMS);
        } else {
          const listHandlesStr = handles.map((i) => toHexString(i));
          listHandlesStr.map((handle) => inputProof += handle);
          kmsSignatures.map((sigKMS) => inputProof += sigKMS);
          inputProof += toHexString(ciphertext);
        }
        return {
          handles,
          inputProof: fromHexString(inputProof)
        };
      });
    },
    encrypt() {
      return __async(this, null, function* () {
        let start = Date.now();
        const ciphertext = yield this._prove();
        console.log(`Encrypting and proving in ${Math.round((Date.now() - start) / 100) / 10}s`);
        start = Date.now();
        const verification = yield this._verify(ciphertext);
        console.log(`Verifying in ${Math.round((Date.now() - start) / 100) / 10}s`);
        return verification;
      });
    }
  };
};
var wasm;
var cachedTextDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8", {
  ignoreBOM: true,
  fatal: true
}) : {
  decode: () => {
    throw Error("TextDecoder not available");
  }
};
if (typeof TextDecoder !== "undefined") {
  cachedTextDecoder.decode();
}
var cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}
function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
var WASM_VECTOR_LEN = 0;
var cachedTextEncoder = typeof TextEncoder !== "undefined" ? new TextEncoder("utf-8") : {
  encode: () => {
    throw Error("TextEncoder not available");
  }
};
var encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
} : function(arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;
  const mem = getUint8ArrayMemory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127) break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);
    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
function isLikeNone(x) {
  return x === void 0 || x === null;
}
var cachedDataViewMemory0 = null;
function getDataViewMemory0() {
  if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }
  return cachedDataViewMemory0;
}
function debugString(val) {
  const type = typeof val;
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`;
  }
  if (type == "string") {
    return `"${val}"`;
  }
  if (type == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = "[";
    if (length > 0) {
      debug += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug += ", " + debugString(val[i]);
    }
    debug += "]";
    return debug;
  }
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    return toString.call(val);
  }
  if (className == "Object") {
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  if (val instanceof Error) {
    return `${val.name}: ${val.message}
${val.stack}`;
  }
  return className;
}
function _assertClass(instance, klass) {
  if (!(instance instanceof klass)) {
    throw new Error(`expected instance of ${klass.name}`);
  }
  return instance.ptr;
}
function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1, 1) >>> 0;
  getUint8ArrayMemory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
function takeFromExternrefTable0(idx) {
  const value = wasm.__wbindgen_export_2.get(idx);
  wasm.__externref_table_dealloc(idx);
  return value;
}
function addToExternrefTable0(obj) {
  const idx = wasm.__externref_table_alloc();
  wasm.__wbindgen_export_2.set(idx, obj);
  return idx;
}
function passArrayJsValueToWasm0(array, malloc) {
  const ptr = malloc(array.length * 4, 4) >>> 0;
  const mem = getDataViewMemory0();
  for (let i = 0; i < array.length; i++) {
    mem.setUint32(ptr + 4 * i, addToExternrefTable0(array[i]), true);
  }
  WASM_VECTOR_LEN = array.length;
  return ptr;
}
function new_client(server_addrs, client_address_hex, param_choice) {
  const ptr0 = passArrayJsValueToWasm0(server_addrs, wasm.__wbindgen_malloc);
  const len0 = WASM_VECTOR_LEN;
  const ptr1 = passStringToWasm0(client_address_hex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len1 = WASM_VECTOR_LEN;
  const ptr2 = passStringToWasm0(param_choice, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len2 = WASM_VECTOR_LEN;
  const ret = wasm.new_client(ptr0, len0, ptr1, len1, ptr2, len2);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return Client.__wrap(ret[0]);
}
function cryptobox_keygen() {
  const ret = wasm.cryptobox_keygen();
  return PrivateEncKey.__wrap(ret);
}
function cryptobox_get_pk(sk) {
  _assertClass(sk, PrivateEncKey);
  const ret = wasm.cryptobox_get_pk(sk.__wbg_ptr);
  return PublicEncKey.__wrap(ret);
}
function cryptobox_pk_to_u8vec(pk) {
  _assertClass(pk, PublicEncKey);
  const ret = wasm.cryptobox_pk_to_u8vec(pk.__wbg_ptr);
  if (ret[3]) {
    throw takeFromExternrefTable0(ret[2]);
  }
  var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
  wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
  return v1;
}
function cryptobox_sk_to_u8vec(sk) {
  _assertClass(sk, PrivateEncKey);
  const ret = wasm.cryptobox_sk_to_u8vec(sk.__wbg_ptr);
  if (ret[3]) {
    throw takeFromExternrefTable0(ret[2]);
  }
  var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
  wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
  return v1;
}
function u8vec_to_cryptobox_pk(v) {
  const ptr0 = passArray8ToWasm0(v, wasm.__wbindgen_malloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.u8vec_to_cryptobox_pk(ptr0, len0);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return PublicEncKey.__wrap(ret[0]);
}
function u8vec_to_cryptobox_sk(v) {
  const ptr0 = passArray8ToWasm0(v, wasm.__wbindgen_malloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.u8vec_to_cryptobox_sk(ptr0, len0);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return PrivateEncKey.__wrap(ret[0]);
}
function process_reencryption_resp_from_js(client, request, eip712_domain, agg_resp, enc_pk, enc_sk, verify) {
  _assertClass(client, Client);
  _assertClass(enc_pk, PublicEncKey);
  _assertClass(enc_sk, PrivateEncKey);
  const ret = wasm.process_reencryption_resp_from_js(client.__wbg_ptr, request, eip712_domain, agg_resp, enc_pk.__wbg_ptr, enc_sk.__wbg_ptr, verify);
  if (ret[3]) {
    throw takeFromExternrefTable0(ret[2]);
  }
  var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
  wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
  return v1;
}
function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    const idx = addToExternrefTable0(e);
    wasm.__wbindgen_exn_store(idx);
  }
}
var ClientFinalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm.__wbg_client_free(ptr >>> 0, 1));
var Client = class _Client {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_Client.prototype);
    obj.__wbg_ptr = ptr;
    ClientFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ClientFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_client_free(ptr, 0);
  }
};
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm.__wbg_cryptoboxct_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm.__wbg_eip712domainmsg_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm.__wbg_parsedreencryptionrequest_free(ptr >>> 0, 1));
var PrivateEncKeyFinalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm.__wbg_privateenckey_free(ptr >>> 0, 1));
var PrivateEncKey = class _PrivateEncKey {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_PrivateEncKey.prototype);
    obj.__wbg_ptr = ptr;
    PrivateEncKeyFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PrivateEncKeyFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_privateenckey_free(ptr, 0);
  }
};
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm.__wbg_privatesigkey_free(ptr >>> 0, 1));
var PublicEncKeyFinalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm.__wbg_publicenckey_free(ptr >>> 0, 1));
var PublicEncKey = class _PublicEncKey {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_PublicEncKey.prototype);
    obj.__wbg_ptr = ptr;
    PublicEncKeyFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PublicEncKeyFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_publicenckey_free(ptr, 0);
  }
};
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm.__wbg_publicsigkey_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm.__wbg_reencryptionrequest_free(ptr >>> 0, 1));
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm.__wbg_reencryptionrequestpayload_free(ptr >>> 0, 1));
var ReencryptionResponseFinalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm.__wbg_reencryptionresponse_free(ptr >>> 0, 1));
var ReencryptionResponse = class _ReencryptionResponse {
  static __unwrap(jsValue) {
    if (!(jsValue instanceof _ReencryptionResponse)) {
      return 0;
    }
    return jsValue.__destroy_into_raw();
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ReencryptionResponseFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_reencryptionresponse_free(ptr, 0);
  }
  /**
   * @returns {Uint8Array}
   */
  get signature() {
    const ret = wasm.__wbg_get_reencryptionresponse_signature(this.__wbg_ptr);
    var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v1;
  }
  /**
   * @param {Uint8Array} arg0
   */
  set signature(arg0) {
    const ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_eip712domainmsg_name(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * Signature of the serialization of \[ReencryptionResponsePayload\].
   * @returns {ReencryptionResponsePayload | undefined}
   */
  get payload() {
    const ret = wasm.__wbg_get_reencryptionresponse_payload(this.__wbg_ptr);
    return ret === 0 ? void 0 : ReencryptionResponsePayload.__wrap(ret);
  }
  /**
   * Signature of the serialization of \[ReencryptionResponsePayload\].
   * @param {ReencryptionResponsePayload | undefined} [arg0]
   */
  set payload(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, ReencryptionResponsePayload);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_reencryptionresponse_payload(this.__wbg_ptr, ptr0);
  }
};
var ReencryptionResponsePayloadFinalization = typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm.__wbg_reencryptionresponsepayload_free(ptr >>> 0, 1));
var ReencryptionResponsePayload = class _ReencryptionResponsePayload {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_ReencryptionResponsePayload.prototype);
    obj.__wbg_ptr = ptr;
    ReencryptionResponsePayloadFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ReencryptionResponsePayloadFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_reencryptionresponsepayload_free(ptr, 0);
  }
  /**
   * Version of the response format.
   * @returns {number}
   */
  get version() {
    const ret = wasm.__wbg_get_reencryptionresponsepayload_version(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * Version of the response format.
   * @param {number} arg0
   */
  set version(arg0) {
    wasm.__wbg_set_reencryptionresponsepayload_version(this.__wbg_ptr, arg0);
  }
  /**
   * The server's signature verification key.
   * Encoded using SEC1.
   * Needed to validate the response, but MUST also be linked to a list of
   * trusted keys.
   * @returns {Uint8Array}
   */
  get verification_key() {
    const ret = wasm.__wbg_get_reencryptionresponsepayload_verification_key(this.__wbg_ptr);
    var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v1;
  }
  /**
   * The server's signature verification key.
   * Encoded using SEC1.
   * Needed to validate the response, but MUST also be linked to a list of
   * trusted keys.
   * @param {Uint8Array} arg0
   */
  set verification_key(arg0) {
    const ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_eip712domainmsg_name(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * The concatenation of two digests:
   * (eip712_signing_hash(pk, domain) || ciphertext digest).
   * This is needed to ensure the response corresponds to the request.
   * @returns {Uint8Array}
   */
  get digest() {
    const ret = wasm.__wbg_get_reencryptionresponsepayload_digest(this.__wbg_ptr);
    var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v1;
  }
  /**
   * The concatenation of two digests:
   * (eip712_signing_hash(pk, domain) || ciphertext digest).
   * This is needed to ensure the response corresponds to the request.
   * @param {Uint8Array} arg0
   */
  set digest(arg0) {
    const ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_eip712domainmsg_version(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * The type of plaintext encrypted.
   * @returns {number}
   */
  get fhe_type() {
    const ret = wasm.__wbg_get_reencryptionresponsepayload_fhe_type(this.__wbg_ptr);
    return ret;
  }
  /**
   * The type of plaintext encrypted.
   * @param {number} arg0
   */
  set fhe_type(arg0) {
    wasm.__wbg_set_reencryptionresponsepayload_fhe_type(this.__wbg_ptr, arg0);
  }
  /**
   * The signcrypted payload, using a hybrid encryption approach in
   * sign-then-encrypt.
   * @returns {Uint8Array}
   */
  get signcrypted_ciphertext() {
    const ret = wasm.__wbg_get_reencryptionresponsepayload_signcrypted_ciphertext(this.__wbg_ptr);
    var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v1;
  }
  /**
   * The signcrypted payload, using a hybrid encryption approach in
   * sign-then-encrypt.
   * @param {Uint8Array} arg0
   */
  set signcrypted_ciphertext(arg0) {
    const ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_eip712domainmsg_chain_id(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * The ID of the MPC party doing the reencryption. Used for polynomial
   * reconstruction.
   * @returns {number}
   */
  get party_id() {
    const ret = wasm.__wbg_get_reencryptionresponsepayload_party_id(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * The ID of the MPC party doing the reencryption. Used for polynomial
   * reconstruction.
   * @param {number} arg0
   */
  set party_id(arg0) {
    wasm.__wbg_set_reencryptionresponsepayload_party_id(this.__wbg_ptr, arg0);
  }
  /**
   * The degree of the sharing scheme used.
   * @returns {number}
   */
  get degree() {
    const ret = wasm.__wbg_get_reencryptionresponsepayload_degree(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * The degree of the sharing scheme used.
   * @param {number} arg0
   */
  set degree(arg0) {
    wasm.__wbg_set_reencryptionresponsepayload_degree(this.__wbg_ptr, arg0);
  }
};
typeof FinalizationRegistry === "undefined" ? {
  register: () => {
  },
  unregister: () => {
  }
} : new FinalizationRegistry((ptr) => wasm.__wbg_requestid_free(ptr >>> 0, 1));
function __wbg_load(module2, imports) {
  return __async(this, null, function* () {
    if (typeof Response === "function" && module2 instanceof Response) {
      if (typeof WebAssembly.instantiateStreaming === "function") {
        try {
          return yield WebAssembly.instantiateStreaming(module2, imports);
        } catch (e) {
          if (module2.headers.get("Content-Type") != "application/wasm") {
            console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
          } else {
            throw e;
          }
        }
      }
      const bytes = yield module2.arrayBuffer();
      return yield WebAssembly.instantiate(bytes, imports);
    } else {
      const instance = yield WebAssembly.instantiate(module2, imports);
      if (instance instanceof WebAssembly.Instance) {
        return {
          instance,
          module: module2
        };
      } else {
        return instance;
      }
    }
  });
}
function __wbg_get_imports() {
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return ret;
  };
  imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
    const obj = arg1;
    const ret = typeof obj === "string" ? obj : void 0;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbindgen_is_object = function(arg0) {
    const val = arg0;
    const ret = typeof val === "object" && val !== null;
    return ret;
  };
  imports.wbg.__wbindgen_is_undefined = function(arg0) {
    const ret = arg0 === void 0;
    return ret;
  };
  imports.wbg.__wbindgen_in = function(arg0, arg1) {
    const ret = arg0 in arg1;
    return ret;
  };
  imports.wbg.__wbindgen_is_null = function(arg0) {
    const ret = arg0 === null;
    return ret;
  };
  imports.wbg.__wbg_reencryptionresponse_unwrap = function(arg0) {
    const ret = ReencryptionResponse.__unwrap(arg0);
    return ret;
  };
  imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
    const obj = arg1;
    const ret = typeof obj === "number" ? obj : void 0;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
  };
  imports.wbg.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
    const ret = arg0 == arg1;
    return ret;
  };
  imports.wbg.__wbindgen_boolean_get = function(arg0) {
    const v = arg0;
    const ret = typeof v === "boolean" ? v ? 1 : 0 : 2;
    return ret;
  };
  imports.wbg.__wbindgen_as_number = function(arg0) {
    const ret = +arg0;
    return ret;
  };
  imports.wbg.__wbg_String_b9412f8799faab3e = function(arg0, arg1) {
    const ret = String(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return ret;
  };
  imports.wbg.__wbg_getwithrefkey_edc2c8960f0f1191 = function(arg0, arg1) {
    const ret = arg0[arg1];
    return ret;
  };
  imports.wbg.__wbg_new_abda76e883ba8a5f = function() {
    const ret = new Error();
    return ret;
  };
  imports.wbg.__wbg_stack_658279fe44541cf6 = function(arg0, arg1) {
    const ret = arg1.stack;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_error_f851667af71bcfc6 = function(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
      deferred0_0 = arg0;
      deferred0_1 = arg1;
      console.error(getStringFromWasm0(arg0, arg1));
    } finally {
      wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
  };
  imports.wbg.__wbg_crypto_1d1f22824a6a080c = function(arg0) {
    const ret = arg0.crypto;
    return ret;
  };
  imports.wbg.__wbg_process_4a72847cc503995b = function(arg0) {
    const ret = arg0.process;
    return ret;
  };
  imports.wbg.__wbg_versions_f686565e586dd935 = function(arg0) {
    const ret = arg0.versions;
    return ret;
  };
  imports.wbg.__wbg_node_104a2ff8d6ea03a2 = function(arg0) {
    const ret = arg0.node;
    return ret;
  };
  imports.wbg.__wbindgen_is_string = function(arg0) {
    const ret = typeof arg0 === "string";
    return ret;
  };
  imports.wbg.__wbg_require_cca90b1a94a0255b = function() {
    return handleError(function() {
      const ret = module.require;
      return ret;
    }, arguments);
  };
  imports.wbg.__wbindgen_is_function = function(arg0) {
    const ret = typeof arg0 === "function";
    return ret;
  };
  imports.wbg.__wbg_msCrypto_eb05e62b530a1508 = function(arg0) {
    const ret = arg0.msCrypto;
    return ret;
  };
  imports.wbg.__wbg_randomFillSync_5c9c955aa56b6049 = function() {
    return handleError(function(arg0, arg1) {
      arg0.randomFillSync(arg1);
    }, arguments);
  };
  imports.wbg.__wbg_getRandomValues_3aa56aa6edec874c = function() {
    return handleError(function(arg0, arg1) {
      arg0.getRandomValues(arg1);
    }, arguments);
  };
  imports.wbg.__wbg_get_5419cf6b954aa11d = function(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
  };
  imports.wbg.__wbg_length_f217bbbf7e8e4df4 = function(arg0) {
    const ret = arg0.length;
    return ret;
  };
  imports.wbg.__wbg_newnoargs_1ede4bf2ebbaaf43 = function(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return ret;
  };
  imports.wbg.__wbg_next_13b477da1eaa3897 = function(arg0) {
    const ret = arg0.next;
    return ret;
  };
  imports.wbg.__wbg_next_b06e115d1b01e10b = function() {
    return handleError(function(arg0) {
      const ret = arg0.next();
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_done_983b5ffcaec8c583 = function(arg0) {
    const ret = arg0.done;
    return ret;
  };
  imports.wbg.__wbg_value_2ab8a198c834c26a = function(arg0) {
    const ret = arg0.value;
    return ret;
  };
  imports.wbg.__wbg_iterator_695d699a44d6234c = function() {
    const ret = Symbol.iterator;
    return ret;
  };
  imports.wbg.__wbg_get_ef828680c64da212 = function() {
    return handleError(function(arg0, arg1) {
      const ret = Reflect.get(arg0, arg1);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_call_a9ef466721e824f2 = function() {
    return handleError(function(arg0, arg1) {
      const ret = arg0.call(arg1);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_self_bf91bf94d9e04084 = function() {
    return handleError(function() {
      const ret = self.self;
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_window_52dd9f07d03fd5f8 = function() {
    return handleError(function() {
      const ret = window.window;
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_globalThis_05c129bf37fcf1be = function() {
    return handleError(function() {
      const ret = globalThis.globalThis;
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_global_3eca19bb09e9c484 = function() {
    return handleError(function() {
      const ret = global$1.global;
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_isArray_6f3b47f09adb61b5 = function(arg0) {
    const ret = Array.isArray(arg0);
    return ret;
  };
  imports.wbg.__wbg_instanceof_ArrayBuffer_74945570b4a62ec7 = function(arg0) {
    let result;
    try {
      result = arg0 instanceof ArrayBuffer;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_call_3bfa248576352471 = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = arg0.call(arg1, arg2);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_isSafeInteger_b9dff570f01a9100 = function(arg0) {
    const ret = Number.isSafeInteger(arg0);
    return ret;
  };
  imports.wbg.__wbg_buffer_ccaed51a635d8a2d = function(arg0) {
    const ret = arg0.buffer;
    return ret;
  };
  imports.wbg.__wbg_newwithbyteoffsetandlength_7e3eb787208af730 = function(arg0, arg1, arg2) {
    const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_new_fec2611eb9180f95 = function(arg0) {
    const ret = new Uint8Array(arg0);
    return ret;
  };
  imports.wbg.__wbg_set_ec2fcf81bc573fd9 = function(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
  };
  imports.wbg.__wbg_length_9254c4bd3b9f23c4 = function(arg0) {
    const ret = arg0.length;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Uint8Array_df0761410414ef36 = function(arg0) {
    let result;
    try {
      result = arg0 instanceof Uint8Array;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_newwithlength_76462a666eca145f = function(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_subarray_975a06f9dbd16995 = function(arg0, arg1, arg2) {
    const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
    return ret;
  };
  imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
    const ret = debugString(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };
  imports.wbg.__wbindgen_memory = function() {
    const ret = wasm.memory;
    return ret;
  };
  imports.wbg.__wbindgen_init_externref_table = function() {
    const table = wasm.__wbindgen_export_2;
    const offset = table.grow(4);
    table.set(0, void 0);
    table.set(offset + 0, void 0);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
  };
  return imports;
}
function __wbg_finalize_init(instance, module2) {
  wasm = instance.exports;
  __wbg_init.__wbindgen_wasm_module = module2;
  cachedDataViewMemory0 = null;
  cachedUint8ArrayMemory0 = null;
  wasm.__wbindgen_start();
  return wasm;
}
function __wbg_init(module_or_path) {
  return __async(this, null, function* () {
    if (wasm !== void 0) return wasm;
    if (typeof module_or_path !== "undefined") {
      if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
        ({
          module_or_path
        } = module_or_path);
      } else {
        console.warn("using deprecated parameters for the initialization function; pass a single object instead");
      }
    }
    if (typeof module_or_path === "undefined") {
      module_or_path = new URL("kms_lib_bg.wasm", import.meta.url);
    }
    const imports = __wbg_get_imports();
    if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {
      module_or_path = fetch(module_or_path);
    }
    const {
      instance,
      module: module2
    } = yield __wbg_load(yield module_or_path, imports);
    return __wbg_finalize_init(instance, module2);
  });
}
var createEIP712 = (chainId) => (publicKey, verifyingContract, delegatedAccount) => {
  if (!isAddress(verifyingContract)) throw new Error("Invalid contract address.");
  if (delegatedAccount && !isAddress(delegatedAccount)) throw new Error("Invalid delegated account.");
  const msgParams = {
    types: {
      // This refers to the domain the contract is hosted on.
      EIP712Domain: [{
        name: "name",
        type: "string"
      }, {
        name: "version",
        type: "string"
      }, {
        name: "chainId",
        type: "uint256"
      }, {
        name: "verifyingContract",
        type: "address"
      }],
      // Refer to primaryType.
      Reencrypt: [{
        name: "publicKey",
        type: "bytes"
      }]
    },
    // This defines the message you're proposing the user to sign, is dapp-specific, and contains
    // anything you want. There are no required fields. Be as explicit as possible when building out
    // the message schema.
    // This refers to the keys of the following types object.
    primaryType: "Reencrypt",
    domain: {
      // Give a user-friendly name to the specific contract you're signing for.
      name: "Authorization token",
      // This identifies the latest version.
      version: "1",
      // This defines the network, in this case, Mainnet.
      chainId,
      // // Add a verifying contract to make sure you're establishing contracts with the proper entity.
      verifyingContract
    },
    message: {
      publicKey: `0x${publicKey}`
    }
  };
  if (delegatedAccount) {
    msgParams.message.delegatedAccount = delegatedAccount;
    msgParams.types.Reencrypt.push({
      name: "delegatedAccount",
      type: "address"
    });
  }
  return msgParams;
};
var generateKeypair = () => {
  const keypair = cryptobox_keygen();
  return {
    publicKey: toHexString(cryptobox_pk_to_u8vec(cryptobox_get_pk(keypair))),
    privateKey: toHexString(cryptobox_sk_to_u8vec(keypair))
  };
};
var aclABI = ["function persistAllowed(uint256 handle, address account) view returns (bool)"];
var reencryptRequest = (kmsSignatures, chainId, kmsContractAddress, aclContractAddress, gatewayUrl, provider) => (handle, privateKey, publicKey, signature, contractAddress, userAddress) => __async(null, null, function* () {
  const acl = new ethers_exports.Contract(aclContractAddress, aclABI, provider);
  const userAllowed = yield acl.persistAllowed(handle, userAddress);
  const contractAllowed = yield acl.persistAllowed(handle, contractAddress);
  if (!userAllowed) {
    throw new Error("User is not authorized to reencrypt this handle!");
  }
  if (!contractAllowed) {
    throw new Error("dApp contract is not authorized to reencrypt this handle!");
  }
  if (userAddress === contractAddress) {
    throw new Error("userAddress should not be equal to contractAddress when requesting reencryption!");
  }
  const payloadForRequest = {
    signature: signature.replace(/^(0x)/, ""),
    client_address: getAddress(userAddress),
    enc_key: publicKey.replace(/^(0x)/, ""),
    ciphertext_handle: handle.toString(16).padStart(64, "0"),
    eip712_verifying_contract: getAddress(contractAddress)
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payloadForRequest)
  };
  let pubKey;
  let privKey;
  try {
    pubKey = u8vec_to_cryptobox_pk(fromHexString(publicKey));
    privKey = u8vec_to_cryptobox_sk(fromHexString(privateKey));
  } catch (e) {
    throw new Error("Invalid public or private key", {
      cause: e
    });
  }
  let response;
  let json;
  try {
    response = yield fetch(`${gatewayUrl}reencrypt`, options);
    if (!response.ok) {
      throw new Error(`Reencrypt failed: gateway respond with HTTP code ${response.status}`);
    }
  } catch (e) {
    throw new Error("Reencrypt failed: Gateway didn't respond", {
      cause: e
    });
  }
  try {
    json = yield response.json();
  } catch (e) {
    throw new Error("Reencrypt failed: Gateway didn't return a JSON", {
      cause: e
    });
  }
  if (json.status === "failure") {
    throw new Error("Reencrypt failed: the reencryption didn't succeed for an unknown reason", {
      cause: json
    });
  }
  const client = new_client(kmsSignatures, userAddress, "default");
  try {
    const buffer = new ArrayBuffer(32);
    const view = new DataView(buffer);
    view.setUint32(28, chainId, false);
    const chainIdArrayBE = new Uint8Array(buffer);
    const eip712Domain = {
      name: "Authorization token",
      version: "1",
      chain_id: chainIdArrayBE,
      verifying_contract: contractAddress,
      salt: null
    };
    const _a = payloadForRequest, {
      ciphertext_handle
    } = _a, p = __objRest(_a, [
      "ciphertext_handle"
    ]);
    const payloadForVerification = __spreadProps(__spreadValues({}, p), {
      ciphertext_digest: json.response[0].ciphertext_digest
    });
    const decryption = process_reencryption_resp_from_js(client, payloadForVerification, eip712Domain, json.response, pubKey, privKey, true);
    return bytesToBigInt(decryption);
  } catch (e) {
    throw new Error("An error occured during decryption", {
      cause: e
    });
  }
});
var createInstance = (config) => __async(null, null, function* () {
  const {
    publicKey,
    kmsContractAddress,
    aclContractAddress
  } = config;
  if (!kmsContractAddress || !isAddress(kmsContractAddress)) {
    throw new Error("KMS contract address is not valid or empty");
  }
  if (!aclContractAddress || !isAddress(aclContractAddress)) {
    throw new Error("ACL contract address is not valid or empty");
  }
  if (publicKey && !(publicKey instanceof Uint8Array)) throw new Error("publicKey must be a Uint8Array");
  const provider = getProvider(config);
  if (!provider) {
    throw new Error("No network has been provided!");
  }
  const chainId = yield getChainId(provider, config);
  const publicKeyData = yield getTfheCompactPublicKey(config);
  const publicParamsData = yield getPublicParams(config);
  const kmsSigners = yield getKMSSigners(provider, config);
  return {
    createEncryptedInput: createEncryptedInput(aclContractAddress, chainId, cleanURL(config.gatewayUrl), publicKeyData.publicKey, publicKeyData.publicKeyId, publicParamsData),
    generateKeypair,
    createEIP712: createEIP712(chainId),
    reencrypt: reencryptRequest(kmsSigners, chainId, kmsContractAddress, aclContractAddress, cleanURL(config.gatewayUrl), provider),
    getPublicKey: () => publicKeyData.publicKey ? {
      publicKey: publicKeyData.publicKey.safe_serialize(SERIALIZED_SIZE_LIMIT_PK),
      publicKeyId: publicKeyData.publicKeyId
    } : null,
    getPublicParams: (bits) => {
      if (publicParamsData[bits]) {
        return {
          publicParams: publicParamsData[bits].publicParams.safe_serialize(SERIALIZED_SIZE_LIMIT_CRS),
          publicParamsId: publicParamsData[bits].publicParamsId
        };
      }
      return null;
    }
  };
});
var initialized = false;
var initFhevm = (..._0) => __async(null, [..._0], function* ({
  tfheParams,
  kmsParams,
  thread
} = {}) {
  if (thread == null) thread = navigator.hardwareConcurrency;
  let supportsThreads = yield threads();
  if (!supportsThreads) {
    console.warn("This browser does not support threads. Verify that your server returns correct headers:\n", "'Cross-Origin-Opener-Policy': 'same-origin'\n", "'Cross-Origin-Embedder-Policy': 'require-corp'");
    thread = void 0;
  }
  if (!initialized) {
    yield __wbg_init$1({
      module_or_path: tfheParams
    });
    yield __wbg_init({
      module_or_path: kmsParams
    });
    if (thread) {
      init_panic_hook();
      yield initThreadPool(thread);
    }
    initialized = true;
  }
  return true;
});
export {
  createEIP712,
  createInstance,
  generateKeypair,
  initFhevm
};
//# sourceMappingURL=fhevmjs.js.map
