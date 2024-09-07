export class User {
    id: string;
    fullName: string;
    email: string;
    emailConfirmed: boolean;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    password: string;
    statusCode: UserStatusCode;
    roles: string[];
    claims: UserClaim[];
    accessFailedCount: number;
    lockoutEnd: Date;
}

export enum UserStatusCode {
    Active = 1,
    Suspended = 2,
    Blocked = 3,
    PaymentServiceSuspended = 4
}

export class UserClaim {
    type: string;
    value: string;
}

export class UsersQuery {
    filter: string;
    sortBy: UsersQueryParameter;
    sortDesc: boolean;
    pageNo: number;
    pageSize: number;
}

export enum UsersQueryParameter {
    Id = 1,
    FullName = 2,
    Email = 3,
    PhoneNumber = 4
}
