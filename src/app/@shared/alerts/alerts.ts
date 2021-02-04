import Swal from 'sweetalert2';

export async function formBasicDialog(title: string, html: string, property: string)
{
    return await Swal.fire({
        title,
        html,
        focusConfirm: false,
        confirmButtonColor: '#009933',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#cc0000',
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

const swalWithBasicOptions = (title: string, html: string, width: number = 500) =>
  Swal.mixin({
    title,
    width,
    html,
    focusConfirm: false,
    confirmButtonColor: '#009933',
    cancelButtonText: 'Cancelar',
    cancelButtonColor: '#cc0000',
    showCancelButton: true,
  });

export async function categoriaFormBasicDialog(title: string, html: string, width: number = 500) {
    return await swalWithBasicOptions(title, html, width).fire({
      preConfirm: () => {
        let error = '';
        const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
        if (!nombre) {           error += 'El nombre es obligatorio<br/>';         }
        const descripcion = (document.getElementById('descripcion') as HTMLInputElement).value;
        const foto = (document.getElementById('foto') as HTMLInputElement).value;
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
        let error = '';
        const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
        if (!nombre) {          error += 'El nombre es obligatorio<br/>';        }
        const descripcion = (document.getElementById('descripcion') as HTMLInputElement).value;
        const familia = (document.getElementById('familia') as HTMLInputElement).value;
        const calorias = (document.getElementById('calorias') as HTMLInputElement).value;
        const foto = (document.getElementById('foto') as HTMLInputElement).value;
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
        let error = '';
        const idNacionalidad = (document.getElementById('idNacionalidad') as HTMLInputElement).value;
        if (!idNacionalidad) {          error += 'El codigo de nacion es obligatorio<br/>';           }
        const nombre = (document.getElementById('descripcion') as HTMLInputElement).value;
        if (!nombre) {          error += 'El nombre de la nacion es obligatorio<br/>';                }
        const icono = (document.getElementById('icono') as HTMLInputElement).value;
        if (!icono) {          error += 'El icono de la bandera de la nacion es obligatorio<br/>';    }
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
      let error = '';
      const email = (document.getElementById('email') as HTMLInputElement).value;
      if (!email) {        error += 'El correo electrónico es obligatorio<br/>';      }
      const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
      if (!nombre) {        error += 'El nombre es obligatorio<br/>';      }
      const apellidos = (document.getElementById('apellidos') as HTMLInputElement).value;
      const usuario = (document.getElementById('usuario') as HTMLInputElement).value;
      if (!usuario) {        error += 'El identificador de usuario es obligatorio<br/>';      }
      const fechaNacimiento = (document.getElementById('fecha_nacimiento') as HTMLInputElement).value;
      const foto = (document.getElementById('foto') as HTMLInputElement).value;
      const nacionalidad = (document.getElementById('nacionalidad') as HTMLInputElement).value;
      const perfil = (document.getElementById('perfil') as HTMLInputElement).value;
      return {
        email,
        nombre,
        apellidos,
        usuario,
        fechaNacimiento,
        foto,
        nacionalidad,
        perfil,
      };
    },
  });
}
