import { Injectable } from '@angular/core';
import { ADD_NACIONALIDAD, DELETE_NACIONALIDAD, MODIFY_NACIONALIDAD } from '@graphql/operations/mutation/nacionalidad';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class NacionalidadesService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  add(ficha: any) {
    return this.set(
      ADD_NACIONALIDAD,
      {
        Datos: {
          idNacionalidad: ficha.idNacionalidad,
          nombre: ficha.nombre,
          icono: ficha.icono,
        },
      },
      {},
      'addNacionalidad'
    ).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  update(id: string, ficha: any) {
    return this.set(
      MODIFY_NACIONALIDAD,
      {
        cod: id,
        Datos: {
          idNacionalidad: ficha.idNacionalidad,
          nombre: ficha.nombre,
          icono: ficha.icono,
        },
      },
      {},
      'updateNacionalidad'
    ).pipe(
      map((result: any) => {
        console.log(result);
        return result;
      })
    );
  }

  delete(id: string) {
    return this.set(
      DELETE_NACIONALIDAD,
      {
        id,
      },
      {},
      'deleteNacionalidad'
    ).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

}

