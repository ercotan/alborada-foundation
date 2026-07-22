/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Environment this build represents: development | staging | production. */
  readonly VITE_APP_ENV?: string;
  /** Public site origin. */
  readonly VITE_SITE_URL?: string;
  /**
   * Absolute URL of the contact enquiry endpoint. Absent until the backend
   * exists; the form reports the integration as missing rather than
   * pretending a submission succeeded.
   */
  readonly VITE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
