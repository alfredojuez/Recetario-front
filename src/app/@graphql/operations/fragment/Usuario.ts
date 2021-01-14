import gql from 'graphql-tag';

// Objeto de usuario para reutilizar en consultas.
// con @include(if: $include) indicamos los campos que no queremos
// que sean visibles si include = false
export const USUARIO_FRAGMENT = gql`
  fragment UserObject on Usuario {
    id
    email
    nombre
    apellidos
    usuario
    pass @include(if: $include)
    foto
    nacionalidad
    perfil
    fechaAlta @include(if: $include)
    ultimoLogin @include(if: $include)
    activo
  }
`;
