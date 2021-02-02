export interface IUsuario{
    id: string;
    email: string;
    nombre: string;
    apellidos?: string;
    usuario: string;
    pass: string;
    fecha_nacimiento: string;
    foto?: string;
    nacionalidad?: string;
    perfil: string;
    fecha_alta: Date;
    ultimo_login: Date;
    activo: boolean;
}
