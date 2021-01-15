import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let respuesta = false;
    let txtSesionStatus = 'SESION NO INICIADA';
    let destino = '/login';
    let resetSesion = true;

    // comprobar que existe sesión
    if (this.auth.getSession() !== null)
    {
      const dataDecode: any = this.decodeToken();
      // comprobar que no está caducado el token
      if (dataDecode.exp < new Date().getTime() / 1000) {
        respuesta = false;
        txtSesionStatus = 'SESION CADUCADA';
        destino = '/login';
        resetSesion = true;   // queremos eliminar datos de la sesion
        basicAlert(TYPE_ALERT.INFO, 'Token caducado', 'Por inactividad se ha procedido a caducar el token, por favor, lóguese de nuevo');
      }
      else
      {
        // verificar que el perfil es correcto.
        if (dataDecode.usuario.perfil === 'ADMIN')
        {
            respuesta = true;
            txtSesionStatus = 'SESIÓN INICIADA y VÁLIDA';
        }
        else
        {
          respuesta = false;
          txtSesionStatus = 'PERMISOS INSUFICIENTES';
          destino = '/';
          resetSesion = false; // queremos seguir logados
          basicAlert(TYPE_ALERT.INFO, 'Permisos insuficientes', 'Tienes que ser adminstrador para poder acceder a esta URL');
        }
      }
    }

    console.log(txtSesionStatus);
    if (!respuesta)
    {
        this.redirect2Login(destino, resetSesion);
    }
    return respuesta;
  }

  redirect2Login(destino = '/', resetSesion = false)
  {
    if (resetSesion)
    {
      this.auth.resetSession();
    }
    this.router.navigate([destino]);
  }

  decodeToken() {
    return jwtDecode(this.auth.getSession().token);
  }
}
