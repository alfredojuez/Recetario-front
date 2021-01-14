import gql from 'graphql-tag';
import { USUARIO_FRAGMENT } from '@graphql/operations/fragment/Usuario';

export const LOGIN_QUERY = gql`
    query getLogin($user:String!, $pass: String!)
    {
      login(email: $user, pass: $pass)
      {
        status
        message
        token
      }
    }
`;

export const LISTA_USUARIOS_QUERY = gql`
query ListaUsuarios ($include: Boolean!)
{
   ListadoUsuarios{
    status
    message
    Usuarios
    {
      ...UserObject
    }
  }
}
${ USUARIO_FRAGMENT}
`;

export const ME_DATA_QUERY = gql`
query meData ($include: Boolean!)
{
  me
  {
    status
    message
    Usuario
    {
      ...UserObject
    }
  }
}
${ USUARIO_FRAGMENT}
`;
