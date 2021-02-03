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
