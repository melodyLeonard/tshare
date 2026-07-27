// Metro compiles an imported .rs source into a base64 WASM string at bundle
// time (see metro.config.js), so to TypeScript the import is just a string.
declare module '*.rs' {
  const wasm: string;
  export default wasm;
}
