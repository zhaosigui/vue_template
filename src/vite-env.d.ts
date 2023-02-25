/// <reference types="vite/client" />
interface ImportMetaEnv {
  // 更多环境变量...
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
