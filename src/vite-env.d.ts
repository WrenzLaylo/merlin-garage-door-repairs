/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_QUOTE_FORM_ENDPOINT: string;
  readonly VITE_TURNSTILE_SITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface TurnstileApi {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
}

interface Window {
  turnstile?: TurnstileApi;
}
