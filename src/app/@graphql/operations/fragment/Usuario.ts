import gql from 'graphql-tag';

// Objeto de usuario para reutilizar en consultas.
// con @include(if: $include) indicamos los campos que no queremos
// que sean visibles si include = false
export const USUARIO_FRAGMENT = gql`
  fragment userObject on Usuario {
    id
    email
    nombre
    apellidos
    usuario
    fecha_nacimiento
    foto
    nacionalidad
    perfil
    fecha_alta @include(if: $include)
    ultimo_login @include(if: $include)
    activo
  }
`;
