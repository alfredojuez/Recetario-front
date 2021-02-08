import gql from 'graphql-tag';
import { USUARIO_FRAGMENT } from '@graphql/operations/fragment/Usuario';

export const ADD_USUARIO = gql`
mutation addUsuario($DatosUsuario: UsuarioInput!, $include: Boolean!) {
    register(RegistroBD: $DatosUsuario) {
      status
      message
      usuario {
          ...UserObject
      }
    }
  }
  ${ USUARIO_FRAGMENT}
`;

export const MODIFY_USUARIO = gql`
mutation actualizarUsuario($idSearch:Int!, $Datos:UsuarioInput!)
{
  updateUsuario(id:$idSearch, nuevoRegistro: $Datos)
  {
    status
    message
		usuario
    {
      ...usuarioObject
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
		usuario
    {
      ...usuarioObject
    }
  }
}
${USUARIO_FRAGMENT}
`;
