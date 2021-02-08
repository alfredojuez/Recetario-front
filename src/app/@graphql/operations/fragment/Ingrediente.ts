import gql from 'graphql-tag';

// Objeto de ingrediente para reutilizar en consultas.
// con @include(if: $include) indicamos los campos que no queremos
// que sean visibles si include = false
export const INGREDIENTE_FRAGMENT = gql`
  fragment ingredienteObject on Ingrediente {
    idIngrediente
    nombre
    descripcion
    foto
    familia
    calorias
    fecha_alta
    usuario_alta
    fecha_modificacion
    usuario_modificacion
  }
`;
