export class User {
    id: string = '';
    fullName: string = '';
    email: string = '';
    emailConfirmed: boolean = false;
    phoneNumber: string = '';
    phoneNumberConfirmed: boolean = false;
    password: string = '';
    statusCode: UserStatusCode = UserStatusCode.Active;
    roles: string[] = [];
    claims: UserClaim[] = []    ;
    accessFailedCount: number = 0;
    lockoutEnd: Date | undefined;
}

export enum UserStatusCode {
    Active = 1,
    Suspended = 2,
    Blocked = 3,
    PaymentServiceSuspended = 4
}

export class UserClaim {
    type: string = '';
    value: string = '';
}

export class UsersQuery {
    filter: string = '';
    sortBy: UsersQueryParameter = UsersQueryParameter.FullName;
    sortDesc: boolean = false;
    pageNo: number = 1;
    pageSize: number = 10;
}

export enum UsersQueryParameter {
    Id = 1,
    FullName = 2,
    Email = 3,
    PhoneNumber = 4
}
