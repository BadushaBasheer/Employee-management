export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    phoneNumber: string;
    gender: string;
    image?: string;
    enabled?: boolean;
    accountNonExpired?: boolean;
    accountNonLocked?: boolean;
    credentialsNonExpired?: boolean;

    deleted?: boolean

    authorities?: [
        {
            authority: string;
        }
    ]
}

export interface UserCred {
    username: string;
    password: string;
}

export interface CustomToken {
    token: string;
    user: User;
}
