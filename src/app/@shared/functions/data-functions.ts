/**
 * Buscamos controlar que los valores de los objetos y/o variables que usemos
 * sean conocidos o no dañinos para el funcionamiento de la aplicación.
 * Por eso, si una variable dudamos si tendrá contenido, con esta función
 * podremos asegurar que no será nulo o indefinido porque en ese caso devolveremos
 * el valor por defecto que indiquemos
 * @param campo         Elemento a evaluar
 * @param porDefecto    Valor en caso de ser nulo o indefinido
 */
export function giveMeValue(campo: any, porDefecto: string = '', mask: string = '') {
  let  respuesta = campo;

  if (mask === 'sortDate')
  {
    campo = (campo !== undefined && campo !== null && campo !== '') ? campo : new Date().toISOString();
    respuesta = DateISO2Normal(campo);
  }
  else
  {
    respuesta = campo !== undefined && campo !== null && campo !== ''
      ? campo
      : porDefecto;
  }

  return respuesta;
}



/**
 * Operaciones con fechas:
 *
 * ejemplo:
 * =================================================================================================
 *      const f1 = new Date().toISOString();
 *      console.log(`Fecha = ${f1}`);               // Fecha = 2021-02-12T21:38:48.211Z
 *      const f2b = DatetimeISO2Normal(f1);
 *      console.log(`Fecha EXT = ${f2b}`);          // Fecha EXT = 12/02/2021 22:38:48
 *      const f2 = DateISO2Normal(f1);
 *      console.log(`Fecha Normal = ${f2}`);        // Fecha Normal = 12/02/2021
 *      const f3 = DateNormal2ISO(f2);
 *      console.log(`Fecha ISO = ${f3}`);           // Fecha ISO = 2021-02-12T00:00:00.000Z
 *      const f4 = DatetimeNormal2ISO(f2b);
 *      console.log(`Fecha completa ISO = ${f4}`);  //Fecha completa ISO = 2021-02-12T21:45:33.000Z
 * =================================================================================================
 *
 * @param fecha Cadena que queremos convertir al formato deseado.
 */
export function DateISO2Normal(fecha: string)
{
    if (fecha === undefined || fecha === '')
    { fecha = new Date().toISOString();
    }
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return  new Date(fecha).toLocaleDateString('es-ES', options);
}

export function DatetimeISO2Normal(fecha: string)
{
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return  new Date(fecha).toLocaleDateString('es-ES', options);
}

export function DateNormal2ISO(fecha: string)
{
    const datos = fecha.split('/');
    return new Date(`${datos[2]}-${datos[1]}-${datos[0]}`).toISOString();
}

export function DatetimeNormal2ISO(fecha: string)
{
    const datosFecha = fecha.split(' ')[0].split('/');
    const datosHora = fecha.split(' ')[1];
    return new Date(`${datosFecha[2]}-${datosFecha[1]}-${datosFecha[0]} ${datosHora}`).toISOString();
}
