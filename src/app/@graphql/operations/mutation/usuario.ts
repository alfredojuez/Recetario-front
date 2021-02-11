import gql from 'graphql-tag';
import { USUARIO_FRAGMENT } from '@graphql/operations/fragment/Usuario';

export const ADD_USUARIO = gql`
mutation creaUsuario($DatosUsuario: UsuarioInput!, $include: Boolean!) {
  addUsuario(usuario: $DatosUsuario) {
      status
      message
      usuario{
      ...userObject
      }
    }
  }
  ${ USUARIO_FRAGMENT}
`;

export const MODIFY_USUARIO = gql`
mutation actualizarUsuario($idSearch:Int!, $Datos: UsuarioInput!, $include: Boolean! = false)
{
  updateUsuario(id:$idSearch, usuario: $Datos)
  {
    status
    message
    usuario{
      ...userObject
    }
  }
}
${USUARIO_FRAGMENT}
`;

export const DELETE_USUARIO = gql`
mutation borrarUsuario($id: Int!)
{
  deleteUsuario(id: $id)
  {
    status
    message
  }
}
`;

export const BLOCK_USER = gql`
mutation bloqueaUsuario($idUsuario: Int!)
{
  blockUsuario(id: $idUsuario)
  {
    status
    message
  }
}
`;

export const UNBLOCK_USER = gql`
mutation desbloqueaUsuario($idUsuario: Int!)
{
  unblockUsuario(id: $idUsuario)
  {
    status
    message
  }
}
`;
