import gql from 'graphql-tag';
import { NACIONALIDAD_FRAGMENT } from '../fragment/Nacionalidad';

export const ADD_NACIONALIDAD = gql`
mutation addRegistro($Datos: NacionalidadInput!)
{
  addNacionalidad(nacionalidad:$Datos)
  {
    status
    message
		nacionalidad
    {
      ...nacionalidadObject
    }
  }
}
${NACIONALIDAD_FRAGMENT}
`;

export const MODIFY_NACIONALIDAD = gql`
mutation actualizarNacionalidad($idSearch:Int!, $Datos:NacionalidadInput!)
{
  updateNacionalidad(idNacionalidad:$idSearch, nuevoRegistro: $Datos)
  {
    status
    message
		nacionalidad
    {
      ...nacionalidadObject
    }
  }
}
${NACIONALIDAD_FRAGMENT}
`;


export const DELETE_NACIONALIDAD = gql`
mutation borrarNacionalidad($id: Int!)
{
  deleteNacionalidad(id: $id)
  {
    status
    message
		nacionalidad
    {
      ...nacionalidadObject
    }
  }
}
${NACIONALIDAD_FRAGMENT}
`;
