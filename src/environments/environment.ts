export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000',
  auth0: {
    domain: 'YOUR_AUTH0_DOMAIN.auth0.com',
    clientId: 'YOUR_AUTH0_ADMIN_CLIENT_ID',
    audience: 'https://api.synctaskpro.com',
    redirectUri: 'http://localhost:4201/callback',
  },
};
