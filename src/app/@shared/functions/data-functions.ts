/**
 * Buscamos controlar que los valores de los objetos y/o variables que usemos
 * sean conocidos o no dañinos para el funcionamiento de la aplicación.
 * Por eso, si una variable dudamos si tendrá contenido, con esta función
 * podremos asegurar que no será nulo o indefinido porque en ese caso devolveremos
 * el valor por defecto que indiquemos
 * @param campo         Elemento a evaluar
 * @param porDefecto    Valor en caso de ser nulo o indefinido
 */
export function giveMeValue(campo: any, porDefecto: string = '') {
    return campo !== undefined && campo !== null && campo !== ''
      ? campo
      : porDefecto;
}
