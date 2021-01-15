import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMeData, ISession } from '@core/interfaces/session.interface';
import { LOGIN_QUERY, ME_DATA_QUERY } from '@graphql/operations/query/usuario';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})

// con extends, y el uso de apollo es para poder usar las funciones del api.services.
export class AuthService extends ApiService {
  accessVar = new Subject<IMeData>();
  accessVar$ = this.accessVar.asObservable();

  constructor(apollo: Apollo) {
    super(apollo);
  }

  updateSesion(newValue: IMeData) {
    this.accessVar.next(newValue);
  }

  start() {
    const haySesionAnterior = this.getSession();
    if ( haySesionAnterior !== null) {
      console.log('Sesión iniciada anteriormente');
      this.getMe().subscribe((result: IMeData) => {
        if (!result.status) {
          this.resetSession();
        } else {
          // Sesión iniciada
          this.updateSesion(result);
        }
      });
    } else {
      this.updateSesion({
        status: false,
      });
      console.log('Sesión no iniciada');
    }
  }

  login(user: string, pass: string) {
    const include = false;
    return this.get(LOGIN_QUERY, { user, pass, include}).pipe(
      map((result: any) => {
        return result.login;
      })
    );
  }

  getMe() {
    return this.get(
      ME_DATA_QUERY,
      { include: false },
      {
        headers: new HttpHeaders({
          authorization: (this.getSession() as ISession).token,
        }),
      }
    ).pipe(
      map((result: any) => {
        return result.me;
      })
    );
  }

  setSession(token: string, expiresTimeInHours = 24) {
    const date = new Date();
    date.setHours(date.getHours() + expiresTimeInHours);

    const session: ISession = {
      expiresIn: new Date(date).toISOString(),
      token,
    };
    // almacenamos la sesion
    localStorage.setItem('session', JSON.stringify(session));
  }

  getSession() {
      // return JSON.parse(localStorage.getItem('session'));
      const sesion = JSON.parse(localStorage.getItem('session'));
      console.log(sesion);
      const respuesta = (sesion !== null) ?  sesion : { expiresIn: '', token: '' };

      return respuesta;
  }

  resetSession() {
    localStorage.removeItem('session');
  }
}
