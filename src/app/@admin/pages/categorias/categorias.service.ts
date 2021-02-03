import { Injectable } from '@angular/core';
import { ADD_CATEGORIA } from '@graphql/operations/mutation/categoria';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  addCategoria(nombre: string)
  {
    return this.set(ADD_CATEGORIA, {categoria: nombre}, {}).pipe(map((result: any) =>{
      return result.addCategoria;
    }));
  }
}
