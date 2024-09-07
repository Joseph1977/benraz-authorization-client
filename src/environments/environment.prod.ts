export const environment = {
    production: true,
    apiBaseUrl: 'https://prod.benraz.com/authorization-server/v1',
    authorization: {
        endpoint: 'https://sso-portal.benraz.com/login',
        applicationId: '04A0084A-F9A4-4468-9285-17CBF0A9E481',
        isCookies: false
    },
    qa: {
        apiBaseUrl: 'https://qa.benraz.com/authorization-server/v1',
        authorization: {
            endpoint: 'https://sso-portal-qa.benraz.com/login',
            applicationId: '04A0084A-F9A4-4468-9285-17CBF0A9E481',
            isCookies: false
        }
    },
    sb: {
        apiBaseUrl: 'https://sb.benraz.com/authorization-server/v1',
        authorization: {
            endpoint: 'https://sso-portal-sb.benraz.com/login',
            applicationId: '04A0084A-F9A4-4468-9285-17CBF0A9E481',
            isCookies: false
        }
    }
};
