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
