import Swal from 'sweetalert2';
import { TYPE_ALERT } from './values.config';

export function basicAlert(
    icon = TYPE_ALERT.INFO,
    title: string = '',
    ) {
  Swal.fire({
    icon,
    position: 'top',
    title,
    text: 'Validación de usuario incorrecta',
    confirmButtonText: 'Entendido, cerrar ventana',
    toast: false,
    timer: 5000
  });
}

export function topRightAlert()
{
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Usuario validado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
}
