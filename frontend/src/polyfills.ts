// polyfills.ts
import { Buffer } from 'buffer';

(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};
(window as any).Buffer = Buffer;

// src/polyfills.ts
// import { Buffer } from 'buffer';
// import process from 'process/browser';

// if (typeof (window as any).global === 'undefined') {
//   (window as any).global = window;
// }
// if (typeof (window as any).process === 'undefined') {
//   (window as any).process = process;
// }
// if (typeof (window as any).Buffer === 'undefined') {
//   (window as any).Buffer = Buffer;
// }

