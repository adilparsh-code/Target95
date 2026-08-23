// Legacy compatibility helper.
//
// Chapter 12 runtime content lives in ./12-classes-objects.js and is exported
// through the chapter-content registry. This file is intentionally not a
// chapter record and must not be imported by the runtime registry.

export const chapter12Writer = Object.freeze({
  source: './12-classes-objects.js',
  registry: false,
  legacy: true,
});

export default chapter12Writer;
