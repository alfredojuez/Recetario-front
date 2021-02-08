import gql from 'graphql-tag';
import { CATEGORIA_FRAGMENT } from '../fragment/Categoria';

export const ADD_CATEGORIA = gql`
mutation addRegistro($Datos: CategoriaInput!)
{
  addCategoria(categoria:$Datos)
  {
    status
    message
		categoria
    {
      ...categoriaObject
    }
  }
}
${CATEGORIA_FRAGMENT}
`;

export const MODIFY_CATEGORIA = gql`
mutation actualizarCategoria($idSearch:Int!, $Datos:CategoriaInput!)
{
  updateCategoria(idCategoria:$idSearch, nuevoRegistro: $Datos)
  {
    status
    message
		categoria
    {
      ...categoriaObject
    }
  }
}
${CATEGORIA_FRAGMENT}
`;


export const DELETE_CATEGORIA = gql`
mutation borrarCategoria($id: Int!)
{
  deleteCategoria(id: $id)
  {
    status
    message
		categoria
    {
      ...categoriaObject
    }
  }
}
${CATEGORIA_FRAGMENT}
`;
