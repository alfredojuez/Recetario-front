import gql from 'graphql-tag';

// Objeto de usuario para reutilizar en consultas.
// con @include(if: $include) indicamos los campos que no queremos
// que sean visibles si include = false
export const RESULT_INFO_FRAGMENT = gql`
  fragment ResultInfoObject on ResultInfo {
    page
    itemsPage
    totalItems
    totalPages
  }
`;
