import gql from 'graphql-tag';
import { USUARIO_FRAGMENT } from '@graphql/operations/fragment/Usuario';
import { RESULT_INFO_FRAGMENT } from '@graphql/operations/fragment/Result-info';

export const LOGIN_QUERY = gql`
    query getLogin($user:String!, $pass: String!, $include: Boolean!)
    {
      login(email: $user, pass: $pass)
      {
        status
        message
        token
        usuario
        {
          ...userObject
        }
      }
    }
    ${ USUARIO_FRAGMENT}
`;

export const LISTA_USUARIOS_QUERY = gql`
    query ListaUsuarios ($include: Boolean!, $active: UserStatus, $page: Int, $itemsPage: Int)
    {
      ListadoUsuariosCompleto(page: $page, itemsPage: $itemsPage, active: $active)
      {
        info
        {
          ...ResultInfoObject
        }

        status
        message
        usuarios
        {
          ...userObject
        }
      }
    }
    ${ USUARIO_FRAGMENT}
    ${ RESULT_INFO_FRAGMENT}
`;

export const ME_DATA_QUERY = gql`
query meData ($include: Boolean!)
{
  me
  {
    status
    message
    usuario
    {
      ...userObject
    }
  }
}
${ USUARIO_FRAGMENT}
`;
