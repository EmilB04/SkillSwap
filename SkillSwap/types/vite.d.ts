declare module "*?url" {
  const result: string;
  export default result;
}

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
