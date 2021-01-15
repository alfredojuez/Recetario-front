import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMeData, ISession } from '@core/interfaces/session.interface';
import { LOGIN_QUERY, ME_DATA_QUERY } from '@graphql/operations/query/usuario';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})

// con extends, y el uso de apollo es para poder usar las funciones del api.services.
export class AuthService extends ApiService{

  constructor(apollo: Apollo) {
    super(apollo);
  }

  start()
  {
    if (this.getSession() !== null)
    {
      console.log(this.getSession());
      console.log('Sesión iniciada anteriormente');
      this.getMe().subscribe((result: IMeData) => {
        if (!result.status){
              this.resetSession();
        }
      });
    }
    else{
      console.log('Sesión no iniciada');
    }
  }


  login(user: string, pass: string) {
    return this.get(LOGIN_QUERY, {user, pass}).pipe(map( (result: any) => {
      return result.login;
    }));
  }

  getMe() {

    return this.get(ME_DATA_QUERY,
                    {include: false},
                    {
                      headers: new HttpHeaders({
                        authorization: (this.getSession() as ISession).token
                      })
                    }
      ).pipe(map((result: any) => {
      return result.me;
    }));
  }

  setSession(token: string, expiresTimeInHours = 24)
  {
      const date = new Date();
      date.setHours(date.getHours() + expiresTimeInHours);

      const session: ISession = {
        expiresIn: new Date(date).toISOString(),
        token
      };
      // almacenamos la sesion
      localStorage.setItem('session', JSON.stringify(session));
  }

  getSession()
  {
    return JSON.parse(localStorage.getItem('session'));
  }

  resetSession()
  {
    localStorage.removeItem('session');
  }

}
