import { Injectable } from '@angular/core';
import { ADD_CATEGORIA, DELETE_CATEGORIA, MODIFY_CATEGORIA } from '@graphql/operations/mutation/categoria';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  add(ficha: any) {
    return this.set(
      ADD_CATEGORIA,
      {
        Datos: {
          nombre: ficha.nombre,
          descripcion: ficha.descripcion,
          foto: ficha.foto,
        },
      },
      {},
      'addCategoria'
    ).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  update(id: number, ficha: any) {
    return this.set(
      MODIFY_CATEGORIA,
      {
        idSearch: id,
        Datos: {
          nombre: ficha.nombre,
          descripcion: ficha.descripcion,
          foto: ficha.foto,
        },
      },
      {},
      'updateCategoria'
    ).pipe(
      map((result: any) => {
        console.log(result);
        return result;
      })
    );
  }

  delete(id: number) {
    return this.set(
      DELETE_CATEGORIA,
      {
        id,
      },
      {},
      'deleteCategoria'
    ).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

}
