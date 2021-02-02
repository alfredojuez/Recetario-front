import gql from 'graphql-tag';
import { RESULT_INFO_FRAGMENT } from '@graphql/operations/fragment/Result-info';
import { CATEGORIA_FRAGMENT } from '@graphql/operations/fragment/Categoria';

export const LISTA_NACIONALIDADES_QUERY = gql`
    query ListaNacionalidades ($include: Boolean!, $page: Int, $itemsPage: Int)
    {
      ListaNacionalidades(page: $page, itemsPage: $itemsPage)
      {
        info
        {
          ...ResultInfoObject
        }

        status
        message
        nacionalidades
        {
          ...nacionalidadObject
        }
      }
    }
    ${ CATEGORIA_FRAGMENT}
    ${ RESULT_INFO_FRAGMENT}
`;

