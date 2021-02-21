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

export const BLOCK_USUARIO = gql`
mutation bloqueaUsuario($idUsuario: Int!)
{
  blockUsuario(id: $idUsuario)
  {
    status
    message
  }
}
`;

export const UNBLOCK_USUARIO = gql`
mutation desbloqueaUsuario($idUsuario: Int!)
{
  unblockUsuario(id: $idUsuario)
  {
    status
    message
  }
}
`;

export const ACTIVATE_USUARIO_MAIL = gql`
mutation activarUsuarioEmail($idUsuario: Int!, $usuario: String!, $email: String!)
{
  activateUserEmail(id: $idUsuario, usuario: $usuario, email: $email)
  {
    status
    message
  }
}
`;

export const ACTIVATE_USUARIO = gql`
mutation activarUsuario($idUsuario: Int!, $pass: String!, $include: Boolean!)
{
  activateUserAction(id:$idUsuario, pass: $pass)
  {
    status
    message
    usuario{
      ...userObject
      }
  }
}
${ USUARIO_FRAGMENT}
`;

export const RESET_PASSWORD_EMAIL =  gql`
mutation resetearPasswordEmail($email: String!)
{
  resetPasswordEmail(mail:$email)
  {
    status
    message
  }
}
`;

export const CHANGE_PASSWORD =  gql`
mutation cambiarPassword($idUsuario: Int!, $pass: String!)
{
  resetPasswordAction(id:$idUsuario, pass:$pass)
  {
    status
    message
  }
}
`;


