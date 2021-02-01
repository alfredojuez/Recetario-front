import { IUsuario } from './usuarios.interface';

export interface IRegisterForm
{
    nombre: string;
    apellidos?: string;
    email: string;
    usuario: string;
    pass: string;
    perfil: string;
    fecha_nacimiento: string;
    nacionalidad?: string;
}

export interface IResultRegister{
    status: boolean;
    message: string;
    usuario?: IUsuario;
}
