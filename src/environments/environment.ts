export const environment = {
  production: false,
  autoDetermineInternalUrls: false,
  apiBaseUrl: 'http://localhost:60341/v1',
  authorization: {
    endpoint: 'http://localhost:4204/login',
    applicationId: 'D5069819-1256-4AEF-9341-2628237C8EE6',
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
