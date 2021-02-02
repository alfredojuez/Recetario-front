import { IUsuario } from './Usuarios.interface';

export interface ISession{
    expiresIn: string;
    token?: string;
}

export interface IMeData
{
    status: boolean;
    message?: string;
    usuario?: IUsuario;
}
