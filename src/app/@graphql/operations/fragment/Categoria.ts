import gql from 'graphql-tag';

// Objeto de categoria para reutilizar en consultas.
// con @include(if: $include) indicamos los campos que no queremos
// que sean visibles si include = false
export const CATEGORIA_FRAGMENT = gql`
  fragment categoriaObject on Categoria {
  idCategoria
  nombre
  descripcion
  foto
  fecha_alta
  usuario_alta
  fecha_modificacion
  usuario_modificacion
  }
`;
