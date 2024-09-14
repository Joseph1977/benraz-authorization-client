export class Application {
    id: string = '';
    name: string = '';
    audience: string = '';
    isAccessTokenCookieEnabled: boolean = false;
    accessTokenCookieName: string = '';
    isAccessTokenFragmentDisabled: boolean = false;
    createdBy: string = '';
    createTimeUtc: Date = new Date();
    updatedBy: string = '';
    updateTimeUtc: Date = new Date();
    ssoConnections: ApplicationSsoConnection[] = [];
    urls: ApplicationUrl[] = [];

    static createDefault(): Application {
        return {
            id: '',
            name: '',
            audience: '',
            isAccessTokenCookieEnabled: false,
            accessTokenCookieName: '',
            isAccessTokenFragmentDisabled: false,
            createdBy: '',
            createTimeUtc: new Date(),
            updatedBy: '',
            updateTimeUtc: new Date(),
            ssoConnections: [],
            urls: [
                { typeCode: ApplicationUrlTypeCode.Callback, url: '' }
            ]
        } as Application;
    }
}

export class ApplicationSsoConnection {
    ssoProviderCode: SsoProviderCode = SsoProviderCode.Microsoft;
    authorizationUrl: string = '';
    tokenUrl: string | undefined;
    clientId: string = '';
    clientSecret: string = '';
    newClientSecret: string = '';
    scope: string = '';
    isEnabled: boolean = true;

    static createDefault(): ApplicationSsoConnection {
        return {
            ssoProviderCode: SsoProviderCode.Microsoft,
            isEnabled: true
        } as ApplicationSsoConnection;
    }
}

export class ApplicationUrl {
    typeCode: ApplicationUrlTypeCode = ApplicationUrlTypeCode.Callback;
    url: string = '';
}

export class ApplicationToken {
    id: string = '';
    name: string = '';
    expirationTimeUtc?: Date;
    roles: string[] = [];
    claims: ApplicationClaim[] = [];
    customFields: ApplicationTokenCustomField[] = [];
    createTimeUtc: Date = new Date();
    createdBy: string = '';
}

export class CreateApplicationToken {
    name: string = '';
    expirationTimeUtc?: Date;
    roles: string[] = [];
    claims: ApplicationClaim[] = [];
    customFields: ApplicationTokenCustomField[] = [];
}

export class ApplicationClaim {
    type: string = '';
    value: string = '';
}

export class ApplicationTokenCustomField {
    key: string = '';
    value: string = '';
}

export enum SsoProviderCode {
    Internal = 1,
    Microsoft = 2,
    Facebook = 3,
    Google = 4
}

export enum ApplicationUrlTypeCode {
    Callback = 2
}

export class ApplicationsQuery {
    filter?: string;
    sortBy?: ApplicationsQueryParameter;
    sortDesc?: boolean;
    pageNo: number = 1;
    pageSize: number = 10;
}

export enum ApplicationsQueryParameter {
    Id = 1,
    Name = 2,
    CreateTimeUtc = 3,
    UpdateTimeUtc = 4,
    CreatedBy = 5,
    UpdatedBy = 6,
    Audience = 7
}
