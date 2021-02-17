import { Injectable, ɵConsole } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {map} from 'rxjs/operators';
import { DocumentNode } from 'graphql';
import { IRegisterForm } from '@core/interfaces/register.interface';
import { ADD_USUARIO } from '@graphql/operations/mutation/usuario';
import { HttpHeaders } from '@angular/common/http';
import { ISession } from '@core/interfaces/session.interface';
import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) { }

  getSession(): ISession {
    const sesion = JSON.parse(localStorage.getItem('session'));
    return  (sesion !== null) ?  sesion : { expiresIn: '', token: '' };
}

  /**
   * Funcion general para unificar todas las peticiones de abajo
   * La funcion es protected para que solo la puedan usar sus hijos.
   * @param query query de GraphQL
   * @param variables variables de uso en la query
   * @param context cabecera y sus parametros
   */
  protected get(query: DocumentNode, variables: object = {}, context: object = {})
  {
    return this.apollo.watchQuery({
      query,
      variables,
      context,
      fetchPolicy: 'network-only'
    }).valueChanges.pipe(map(result => {
        return  result.data;
    }));
  }

  protected set(query: DocumentNode, variables: object = {}, context: object = {}, key: string = '')
  {
    // inyectamos el token en todas las peticiones
    context =    { headers: new HttpHeaders({ authorization: (this.getSession() as ISession).token }), };

    return this.apollo.mutate({
      mutation: query,
      variables,
      context
    }).pipe(map(result => {
      return JSON.parse(JSON.stringify(result.data))[key];
  }));
  }


}
