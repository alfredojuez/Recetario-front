import { variable } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LISTA_USUARIOS_QUERY, LOGIN_QUERY, ME_DATA_QUERY } from '@graphql/operations/query/usuario';
import {map} from 'rxjs/operators';
import { DocumentNode } from 'graphql';

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

  register() {

  }

}
