export class Page<T> {
    items: T[];
    pageNo: number;
    pageSize: number;
    totalCount: number;
}

export class Policies {
    public static readonly APPLICATION_READ = 'application-read';
    public static readonly APPLICATION_ADD = 'application-add';
    public static readonly APPLICATION_UPDATE = 'application-update';
    public static readonly APPLICATION_DELETE = 'application-delete';
    public static readonly USER_READ = 'user-read';
    public static readonly USER_ADD = 'user-add';
    public static readonly USER_UPDATE = 'user-update';
    public static readonly USER_DELETE = 'user-delete';
    public static readonly USER_STATUS_READ = 'user-status-read';
    public static readonly USER_STATUS_SUSPEND = 'user-status-suspend';
    public static readonly USER_STATUS_BLOCK = 'user-status-block';
    public static readonly USER_UNLOCK = 'user-unlock';
    public static readonly USER_ROLE_READ = 'user-role-read';
    public static readonly USER_ROLE_UPDATE = 'user-role-update';
    public static readonly USER_CLAIM_READ = 'user-claim-read';
    public static readonly USER_CLAIM_UPDATE = 'user-claim-update';
    public static readonly USER_EMAIL_READ = 'user-email-read';
    public static readonly USER_EMAIL_VERIFY = 'user-email-verify';
    public static readonly USER_PHONE_READ = 'user-phone-read';
    public static readonly USER_PHONE_VERIFY = 'user-phone-verify';
    public static readonly USER_PASSWORD_RESET = 'user-password-reset';
    public static readonly ROLE_READ = 'role-read';
    public static readonly ROLE_ADD = 'role-add';
    public static readonly ROLE_UPDATE = 'role-update';
    public static readonly ROLE_DELETE = 'role-delete';
    public static readonly CLAIM_READ = 'claim-read';
    public static readonly CLAIM_ADD = 'claim-add';
    public static readonly CLAIM_DELETE = 'claim-delete';
}

export class Claims {
    public static readonly APPLICATION_READ = 'authorization-application-read';
    public static readonly APPLICATION_ADD = 'authorization-application-add';
    public static readonly APPLICATION_UPDATE = 'authorization-application-update';
    public static readonly APPLICATION_DELETE = 'authorization-application-delete';
    public static readonly USER_READ = 'authorization-user-read';
    public static readonly USER_ADD = 'authorization-user-add';
    public static readonly USER_UPDATE = 'authorization-user-update';
    public static readonly USER_DELETE = 'authorization-user-delete';
    public static readonly USER_STATUS_READ = 'authorization-user-status-read';
    public static readonly USER_STATUS_SUSPEND = 'authorization-user-status-suspend';
    public static readonly USER_STATUS_BLOCK = 'authorization-user-status-block';
    public static readonly USER_UNLOCK = 'authorization-user-unlock';
    public static readonly USER_ROLE_READ = 'authorization-user-role-read';
    public static readonly USER_ROLE_UPDATE = 'authorization-user-role-update';
    public static readonly USER_CLAIM_READ = 'authorization-user-claim-read';
    public static readonly USER_CLAIM_UPDATE = 'authorization-user-claim-update';
    public static readonly USER_EMAIL_READ = 'authorization-user-email-read';
    public static readonly USER_EMAIL_VERIFY = 'authorization-user-email-verify';
    public static readonly USER_PHONE_READ = 'authorization-user-phone-read';
    public static readonly USER_PHONE_VERIFY = 'authorization-user-phone-verify';
    public static readonly USER_PASSWORD_RESET = 'authorization-user-password-reset';
    public static readonly ROLE_READ = 'authorization-role-read';
    public static readonly ROLE_ADD = 'authorization-role-add';
    public static readonly ROLE_UPDATE = 'authorization-role-update';
    public static readonly ROLE_DELETE = 'authorization-role-delete';
    public static readonly CLAIM_READ = 'authorization-claim-read';
    public static readonly CLAIM_ADD = 'authorization-claim-add';
    public static readonly CLAIM_DELETE = 'authorization-claim-delete';
}