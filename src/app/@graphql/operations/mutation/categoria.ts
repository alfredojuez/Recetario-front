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
