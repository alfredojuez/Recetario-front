import { Injectable } from '@angular/core';
import { ADD_USUARIO } from '@graphql/operations/mutation/usuario';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  addUsuario(nombre: string)
  {
    return this.set(ADD_USUARIO, {categoria: nombre}, {}).pipe(map((result: any) =>{
      return result.addUsuario;
    }));
  }
}
