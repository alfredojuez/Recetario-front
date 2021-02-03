import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {map} from 'rxjs/operators';
import { DocumentNode } from 'graphql';
import { IRegisterForm } from '@core/interfaces/register.interface';
import { ADD_USUARIO } from '@graphql/operations/mutation/usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) { }

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

  // añadir metodos para consumir la API
  // login(user: string, pass: string) {
  //   return this.apollo.watchQuery({
  //     query: LOGIN_QUERY,
  //     // variables: { 'user':user, 'pass': pass },
  //     variables: { user, pass },
  //     fetchPolicy: 'network-only'
  //   }).valueChanges.pipe(map(result => {
  //       return  result.data;
  //   }));
  // }

  protected set(query: DocumentNode, variables: object = {}, context: object = {}){
    return this.apollo.mutate({
      mutation: query,
      variables,
    }).pipe(map(result => {
      return  result.data;
  }));
  }


}
