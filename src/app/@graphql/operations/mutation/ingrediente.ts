import gql from 'graphql-tag';
import { INGREDIENTE_FRAGMENT } from '../fragment/Ingrediente';

export const ADD_INGREDIENTE = gql`
mutation addRegistro($Datos: IngredienteInput!)
{
  addIngrediente(ingrediente:$Datos)
  {
    status
    message
    ingrediente
    {
      ...ingredienteObject
    }
  }
}
${INGREDIENTE_FRAGMENT}
`;

export const MODIFY_INGREDIENTE = gql`
mutation actualizarIngrediente($idSearch:Int!, $Datos:IngredienteInput!)
{
  updateIngrediente(idIngrediente:$idSearch, nuevoRegistro: $Datos)
  {
    status
    message
		ingrediente
    {
      ...ingredienteObject
    }
  }
}
${INGREDIENTE_FRAGMENT}
`;


export const DELETE_INGREDIENTE = gql`
mutation borrarIngrediente($id: Int!)
{
  deleteIngrediente(id: $id)
  {
    status
    message
		ingrediente
    {
      ...ingredienteObject
    }
  }
}
${INGREDIENTE_FRAGMENT}
`;
