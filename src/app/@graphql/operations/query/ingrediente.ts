import gql from 'graphql-tag';
import { RESULT_INFO_FRAGMENT } from '@graphql/operations/fragment/Result-info';
import { INGREDIENTE_FRAGMENT } from '../fragment/Ingrediente';

export const LISTA_INGREDIENTES_QUERY = gql`
    query ListaIngredientes ($include: Boolean!, $page: Int, $itemsPage: Int)
    {
      ListaIngredientes(page: $page, itemsPage: $itemsPage)
      {
        info
        {
          ...ResultInfoObject
        }

        status
        message
        ingredientes
        {
          ...ingredienteObject
        }
      }
    }
    ${ INGREDIENTE_FRAGMENT}
    ${ RESULT_INFO_FRAGMENT}
`;

