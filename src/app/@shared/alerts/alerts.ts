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


export function infoDetailBasic(title: string, html: string, width: number = 500)
{
  Swal.fire({
    title,
    html,
    confirmButtonText: 'Cerrar información',
    confirmButtonColor: OK_BUTTON
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
        const nombre = (document.getElementById('descripcion') as HTMLInputElement).value;
        if (!nombre) {              Swal.showValidationMessage('El nombre de la nacion es obligatorio');                }
        const icono = (document.getElementById('icono') as HTMLInputElement).value;
        if (!icono) {               Swal.showValidationMessage('El icono de la bandera de la nacion es obligatorio');    }
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
      // Mostramos valores de error para los campos obligatorios
      const email =     ( document.getElementById('email') as HTMLInputElement).value;
      if (!email)       { Swal.showValidationMessage('El correo electrónico es obligatorio');       }
      const usuario =   ( document.getElementById('usuario') as HTMLInputElement).value;
      if (!usuario)     { Swal.showValidationMessage('El identificador de usuario es obligatorio'); }
      const pass =      ( document.getElementById('pass') as HTMLInputElement).value;
      if (!pass)        { Swal.showValidationMessage('La contraseña es obligatoria');               }
      const nombre =    ( document.getElementById('nombre') as HTMLInputElement).value;
      if (!nombre)      { Swal.showValidationMessage('El nombre es obligatorio');                   }
      const apellidos = ( document.getElementById('apellidos') as HTMLInputElement).value;
      const fechaNacimiento = (document.getElementById('fecha_nacimiento') as HTMLInputElement).value;
      if (!fechaNacimiento){ Swal.showValidationMessage('La fecha de nacimiento es obligatoria');   }
      const nacionalidad = (document.getElementById('nacionalidad') as HTMLInputElement).value;
      const perfil = (document.getElementById('perfil') as HTMLInputElement).value;
      const foto = (document.getElementById('foto') as HTMLInputElement).value;
      return {
        email,
        nombre,
        apellidos,
        usuario,
        pass,
        fechaNacimiento,
        nacionalidad,
        perfil,
        foto,
      };
    },
  });
}
