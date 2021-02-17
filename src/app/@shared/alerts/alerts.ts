import { EMAIL_PATTERN } from '@core/constant/regex';
import { DateNormal2ISO, giveMeValue } from '@shared/functions/data-functions';
import { info } from 'console';
import Swal from 'sweetalert2';

const OK_BUTTON = '#28a745';
const KO_BUTTON = '#cc0000';


/**
 * Válido para pedir un dato.
 */
export async function simpleInputDialog(title: string, html: string, property: string)
{
    return await Swal.fire({
        title,
        html,
        focusConfirm: false,
        confirmButtonColor: OK_BUTTON,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: KO_BUTTON,
        showCancelButton: true,
        preConfirm: () => {
            const respuesta = ((document.getElementById('nombre')) as HTMLInputElement).value;
            if (!respuesta)
            {
                Swal.showValidationMessage('No se puede dejar en campo en blanco');
            }
            return respuesta;
        }
      });
}

export function comboDataFormDialog(title: string, inputOptions: any, width: number = 500)
{
  Swal.fire({
    title,
    width,
    html: '<hr>',
    confirmButtonColor: OK_BUTTON,
    confirmButtonText: 'Seleccionar',
    showCancelButton: true,
    cancelButtonColor: KO_BUTTON,
    cancelButtonText: 'Cancelar',

    input: 'select',
    inputOptions: {
        apples: 'Apples',
        bananas: 'Bananas',
        grapes: 'Grapes',
        oranges: 'Oranges'
    },
    inputPlaceholder: 'Seleccione su nacionalidad',
  });
}

export function selectFileFormDialog(title: string, inputOptions: any, width: number = 500)
{
  Swal.fire({
    title,
    width,
    html: '<hr>',
    confirmButtonColor: OK_BUTTON,
    confirmButtonText: 'Seleccionar',
    showCancelButton: true,
    cancelButtonColor: KO_BUTTON,
    cancelButtonText: 'Cancelar',

    input: 'file',
    inputAttributes: {
      accept: 'image/*',
      'aria-label': 'Upload your profile picture'
    },
    preConfirm: (file) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          return file;
        };
        reader.readAsDataURL(file);
      }
    }
  });
}

export function encuestaFormDialog(title: string)
{
  Swal.mixin({
    input: 'text',
    confirmButtonText: 'Siguiente',
    showCancelButton: true,
    cancelButtonText: 'Parar esto ya!',
    progressSteps: ['1', '2', '3', '4']
  }).queue([
    {
      title: 'Primera pregunta',
      text: '¿Cual es tu nombre?'
    },
    'Question 2',
    {
      title: 'Tercera pregunta',
      text: '¿Cual es tu fecha de nacimiento?',
    },
    'Question 3'
  ]).then((result) => {
    console.log(result);
    if (result)
    {
      const answers = JSON.parse(JSON.stringify(result)).value;
      console.log(answers);
      return answers;
     }
  });
}

export function infoDetailBasic(title: string, html: string, width: number = 500)
{
  Swal.fire({
    title,
    html,
    width,
    confirmButtonText: 'Cerrar información',
    confirmButtonColor: OK_BUTTON,
    showClass: {
      popup: 'swal2-show',
      backdrop: 'swal2-backdrop-show',
      icon: 'swal2-icon-show'
    }
  });
}

const swalWithBasicOptions = (title: string, html: string, width: number = 500, readonly: boolean = false) =>
  Swal.mixin({
    title,
    width,
    html,
    focusConfirm: false,
    confirmButtonColor: OK_BUTTON,
    cancelButtonText: (readonly) ? 'Cerrar ventana' : 'Cancelar',
    cancelButtonColor: (readonly) ? OK_BUTTON : KO_BUTTON,
    // si estamos en modo readonly solo mostramos un boton, que será el de cancelación de ventana (sin efecto)
    showCancelButton: true,
    showConfirmButton: !readonly,
});

export async function confirmDetailBasic( title: string,
                                          html: string,
                                          confirmButtonText: string = 'Eliminar',
                                          cancelButtonText: string = 'Cancelar',
                                          width: number = 500)
{
  return await Swal.fire({
    title,
    html,
    // icon: 'warning',
    width,
    confirmButtonText,
    confirmButtonColor: OK_BUTTON,
    showCancelButton: true,
    cancelButtonText,
    cancelButtonColor: KO_BUTTON,
  }).then((result) => {
    return result.value ? true : false;
  });
}


export async function categoriaFormBasicDialog(title: string, html: string, width: number = 500, readonly: boolean = false) {
    return await swalWithBasicOptions(title, html, width, readonly).fire({
      preConfirm: () => {
        // Mostramos valores de error para los campos obligatorios
        const nombre =      (document.getElementById('nombre') as HTMLInputElement).value;
        if (!nombre)        { Swal.showValidationMessage('El nombre es obligatorio'); }
        const descripcion = (document.getElementById('descripcion') as HTMLInputElement).value;
        const foto =        (document.getElementById('foto') as HTMLInputElement).value;

        return {
          nombre,
          descripcion,
          foto,
        };
      },
    });
}

export async function ingredienteFormBasicDialog(title: string, html: string, width: number = 500) {
    return await swalWithBasicOptions(title, html, width).fire({
      preConfirm: () => {

        // Mostramos valores de error para los campos obligatorios
        const nombre =    (document.getElementById('nombre') as HTMLInputElement).value;
        if (!nombre)      { Swal.showValidationMessage('El nombre es obligatorio'); }
        const descripcion = (document.getElementById('descripcion') as HTMLInputElement).value;
        const familia =   (document.getElementById('familia') as HTMLInputElement).value;
        const calorias =   (document.getElementById('calorias') as HTMLInputElement).value;
        const foto =      (document.getElementById('foto') as HTMLInputElement).value;

        return {
          nombre,
          descripcion,
          familia,
          calorias,
          foto,
        };
      },
    });
}

export async function nacionalidadFormBasicDialog(title: string, html: string, width: number = 500) {
    return await swalWithBasicOptions(title, html, width).fire({
      preConfirm: () => {
        // Mostramos valores de error para los campos obligatorios
        const idNacionalidad = (document.getElementById('idNacionalidad') as HTMLInputElement).value;
        if (!idNacionalidad) {      Swal.showValidationMessage('El codigo de nacion es obligatorio');           }
        const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
        if (!nombre) {              Swal.showValidationMessage('El nombre de la nacion es obligatorio');                }
        const icono = (document.getElementById('icono') as HTMLInputElement).value;
        // if (!icono) {               Swal.showValidationMessage('El icono de la bandera de la nacion es obligatorio');    }
        return {
          idNacionalidad,
          nombre,
          icono,
        };
      },
    });
}

export async function usuarioFormBasicDialog(title: string, html: string, width: number = 500) {
  return await swalWithBasicOptions(title, html, width).fire({
    preConfirm: () => {
      let errores = '';
      // Mostramos valores de error para los campos obligatorios
      const email =         ( document.getElementById('email') as HTMLInputElement).value;
      if (!email)           { errores += 'El correo electrónico es obligatorio<br>';       }
      if (!EMAIL_PATTERN.test(email)) {errores += 'Formato del email incorrecto<br>'}
      const usuario =       ( document.getElementById('usuario') as HTMLInputElement).value;
      if (!usuario)         { errores += 'El identificador de usuario es obligatorio<br>'; }
      const pass =          ( document.getElementById('pass') as HTMLInputElement).value;
      // if (!pass)            { errores += 'La contraseña es obligatoria<br>';               }
      const nombre =        ( document.getElementById('nombre') as HTMLInputElement).value;
      if (!nombre)          { errores += 'El nombre es obligatorio<br>';                   }
      const apellidos =     ( document.getElementById('apellidos') as HTMLInputElement).value;
      const fechaNacimiento = (document.getElementById('fecha_nacimiento') as HTMLInputElement).value;
      if (!fechaNacimiento) { errores += 'La fecha de nacimiento es obligatoria<br>';   }
      const nacionalidad =  (document.getElementById('nacionalidad') as HTMLInputElement).value;
      const perfil =        giveMeValue((document.getElementById('perfil') as HTMLInputElement).value, 'USER');
      // const foto =      (document.getElementById('foto') as HTMLInputElement).value;

      if (errores !== '') {  Swal.showValidationMessage(errores); }

      return {
        email,
        nombre,
        apellidos,
        usuario,
        pass,
        fecha_nacimiento: DateNormal2ISO(fechaNacimiento),
        nacionalidad,
        perfil,
        // foto,
      };
    },
  });
}
