export interface IUser {
    email: string;
    password: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    isAdmin?: boolean
}