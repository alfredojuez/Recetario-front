import gql from 'graphql-tag';
import { RESULT_INFO_FRAGMENT } from '@graphql/operations/fragment/Result-info';
import { NACIONALIDAD_FRAGMENT } from '../fragment/Nacionalidad';

export const LISTA_NACIONALIDADES_QUERY = gql`
    query ListaNacionalidades ($page: Int, $itemsPage: Int)
    {
      ListadoNacionalidades(page: $page, itemsPage: $itemsPage)
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
    ${NACIONALIDAD_FRAGMENT}
    ${RESULT_INFO_FRAGMENT}
`;
