export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000',
  auth0: {
    domain: 'synctaskpro-dev.eu.auth0.com',
    clientId: 'BRE7yx4ErRlEy4PfJhjJ2nATiEEpNDqG',
    audience: 'https://api.synctaskpro.com',
    redirectUri: 'http://localhost:4201/callback',
  },
  allowedAdminEmails: ['cras.dev@gmail.com'],
};
