export const environment = {
  production: false,
  apiBaseUrl: 'https://dev.benraz.com/authorization-server/v1',
  authorization: {
    endpoint: 'https://sso-portal-dev.benraz.com/login',
    applicationId: '04A0084A-F9A4-4468-9285-17CBF0A9E481',
    isCookies: false
  },
  qa: {
    apiBaseUrl: null,
    authorization: {
      endpoint: null,
      applicationId: null,
      isCookies: null
    }
  },
  sb: {
    apiBaseUrl: null,
    authorization: {
      endpoint: null,
      applicationId: null,
      isCookies: null
    }
  }
};
