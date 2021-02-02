import gql from 'graphql-tag';
import { RESULT_INFO_FRAGMENT } from '@graphql/operations/fragment/Result-info';
import { CATEGORIA_FRAGMENT } from '@graphql/operations/fragment/Categoria';

export const LISTA_CATEGORIAS_QUERY = gql`
    query ListaCategorias ($include: Boolean!, $page: Int, $itemsPage: Int)
    {
      ListadoCategorias(page: $page, itemsPage: $itemsPage)
      {
        info
        {
          ...ResultInfoObject
        }

        status
        message
        categorias
        {
          ...categoriaObject
        }
      }
    }
    ${ CATEGORIA_FRAGMENT}
    ${ RESULT_INFO_FRAGMENT}
`;

