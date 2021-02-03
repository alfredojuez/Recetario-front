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
