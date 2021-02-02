import gql from 'graphql-tag';

// Objeto de nacionalidad para reutilizar en consultas.
// con @include(if: $include) indicamos los campos que no queremos
// que sean visibles si include = false
export const NACIONALIDAD_FRAGMENT = gql`
  fragment nacionalidadObject on Nacionalidad {
  idNacionalidad
  nombre
  icono
  fecha_alta
  usuario_alta
  fecha_modificacion
  usuario_modificacion
  }
`;
