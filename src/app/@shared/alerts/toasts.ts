import Swal from 'sweetalert2';
import { TYPE_ALERT } from './values.config';

export function basicAlert(
    icon = TYPE_ALERT.INFO,
    title: string = '',
    text: string = ''
    ) {
  Swal.fire({
    icon,
    title,
    text,
    position: 'top',
    // no quiero que tenga boton de cierre
    showConfirmButton: false,
    // falso para que no sea en linea
    toast: false,
    // con un timer de 4 seg para cerrarse solo
    timer: 4000,
    timerProgressBar: true,
    // para que si nos ponemos encima no siga el timer...
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
}

export function topRightAlert( icon = TYPE_ALERT.INFO,  title: string = '', position: any = 'bottom-end')
{
    Swal.fire({
        position,
        icon,
        title,
        showConfirmButton: false,
        timer: 1500
      });
}
