interface ImportMetaEnv {
  readonly VITE_API_HOST: string;
  readonly VITE_SHA_512_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
