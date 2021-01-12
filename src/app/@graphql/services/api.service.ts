import { variable } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN_QUERY } from '../operations/query/usuario';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) { }
  
  //añadir metodos para consumir la API
  login(user: string, pass: string) {
    console.log("llego aqui");
    return this.apollo.watchQuery({
      query: LOGIN_QUERY,
      variables: { "user":user, "pass": pass }
    }).valueChanges.pipe(map((result) => {
        console.log("aqui no entra");
        return  result.data;
    }));
  };
  getUsuarios() {};
  getMe() {};
  register() {};
  
}
