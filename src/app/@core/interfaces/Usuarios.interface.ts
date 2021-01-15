export interface IUsuario{
    id: string;
    email: string;
    nombre: string;
    apellidos?: string;
    usuario: string;
    pass: string;
    foto?: string;
    nacionalidad?: string;
    perfil: string;
    fechaAlta: Date;
    ultimoLogin: Date;
    activo: boolean;
}
