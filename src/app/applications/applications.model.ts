export class Application {
    id: string;
    name: string;
    audience: string;
    isAccessTokenCookieEnabled: boolean;
    accessTokenCookieName: string;
    isAccessTokenFragmentDisabled: boolean;
    createdBy: string;
    createTimeUtc: Date;
    updatedBy: string;
    updateTimeUtc: Date;
    ssoConnections: ApplicationSsoConnection[];
    urls: ApplicationUrl[];

    static createDefault(): Application {
        return {
            isAccessTokenCookieEnabled: false,
            isAccessTokenFragmentDisabled: false,
            ssoConnections: [],
            urls: [
                { typeCode: ApplicationUrlTypeCode.Callback }
            ]
        } as Application;
    }
}

export class ApplicationSsoConnection {
    ssoProviderCode: SsoProviderCode;
    authorizationUrl: string;
    tokenUrl: string;
    clientId: string;
    clientSecret: string;
    newClientSecret: string;
    scope: string;
    isEnabled: boolean;

    static createDefault(): ApplicationSsoConnection {
        return {
            ssoProviderCode: SsoProviderCode.Microsoft,
            isEnabled: true
        } as ApplicationSsoConnection;
    }
}

export class ApplicationUrl {
    typeCode: ApplicationUrlTypeCode;
    url: string;
}

export class ApplicationToken {
    id: string;
    name: string;
    expirationTimeUtc?: Date;
    roles: string[];
    claims: ApplicationClaim[];
    customFields: ApplicationTokenCustomField[];
    createTimeUtc: Date;
    createdBy: string;
}

export class CreateApplicationToken {
    name: string;
    expirationTimeUtc?: Date;
    roles: string[];
    claims: ApplicationClaim[];
    customFields: ApplicationTokenCustomField[];
}

export class ApplicationClaim {
    type: string;
    value: string;
}

export class ApplicationTokenCustomField {
    key: string;
    value: string;
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
    pageNo: number;
    pageSize: number;
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
