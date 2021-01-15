export interface ILoginForm{
    email: string;
    pass: string;
}

export interface IResultLogin{
    status: boolean;
    message: string;
    token?: string;
}

