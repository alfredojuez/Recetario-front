import { Injectable } from '@angular/core';
import { ADD_CATEGORIA, MODIFY_CATEGORIA } from '@graphql/operations/mutation/categoria';
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
        console.log('-add-------------------------------------------');
        console.log(result);
        // return result.addCategoria
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
        console.log('-update-------------------------------------------');
        console.log(result);
        return result.categoria;
      })
    );
  }


}
