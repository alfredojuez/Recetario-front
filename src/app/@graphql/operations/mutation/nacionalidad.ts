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
