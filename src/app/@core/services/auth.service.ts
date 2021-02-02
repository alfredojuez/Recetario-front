import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  login(user: string, pass: string) {
    return this.get(LOGIN_QUERY, {user, pass}).pipe(map( (result: any) => {
      return result.login;
    }));
  }

  
  getMe() {
    const mytoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZmI3YjQzY2Q4MjFiMTUzNDcxZjFkNyIsImVtYWlsIjoiYWxmcmVkb2p1ZXpAaG90bWFpbC5jb20iLCJub21icmUiOiJBbGZyZWRvIiwiYXBlbGxpZG9zIjoiSnVleiIsInVzdWFyaW8iOiJhbGZyZWRvanVleiIsInBhc3MiOiIkMmIkMTAkRVVodWRVMjBqcUd2VndFVmRRU1pyLnEyQUtJU2JNbnFqTTU0M1UyRVNVWU90eUU1ejgyN0siLCJmb3RvIjoiIiwibmFjaW9uYWxpZGFkIjoiIiwicGVyZmlsIjoiQURNSU4iLCJhY3Rpdm8iOnRydWUsImlkIjoxLCJmZWNoYUFsdGEiOiIyMDIxLTAxLTEwVDIyOjEwOjExLjUyNFoiLCJ1bHRpbW9Mb2dpbiI6IjIwMjEtMDEtMTBUMjI6MTA6MTEuNTI0WiJ9LCJpYXQiOjE2MTA2MjE0NTgsImV4cCI6MTYxMDY0MzA1OH0.LY59n81Pov_QKxRpWKKt3097V_5PIcJ6n_IwAmve2YQ';

    return this.get(ME_DATA_QUERY,
                    {include: false},
                    {
                      headers: new HttpHeaders({
                        authorization: mytoken
                      })
                    }
      ).pipe(map((result: any) => {
      return result.me;
    }));
  }

}
