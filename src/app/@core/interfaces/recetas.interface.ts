import { ICategoria } from "./categorias.interface";
import { IIngrediente } from "./ingredientes.interface";

export interface IReceta{

    id: string;
    titulo: string;
    descripcion: string;
    foto: string;
    ingredientes: Array<IIngrediente>;
    categorias: Array<ICategoria>;

    fecha_alta: string;
    usuario_alta: string;
    fecha_modificacion: string;
    usuario_modificacion: string;
}
