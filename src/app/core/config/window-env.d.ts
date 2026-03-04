export {};

declare global {
  interface Window {
    __env?: {
      AUTH0_DOMAIN?: string;
      AUTH0_ADMIN_CLIENT_ID?: string;
      API_URL?: string;
    };
  }
}
