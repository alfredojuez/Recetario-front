import { Injectable } from '@angular/core';
import { ADD_INGREDIENTE, MODIFY_INGREDIENTE } from '@graphql/operations/mutation/ingrediente';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class IngredientesService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  add(ficha: any) {
    return this.set(
      ADD_INGREDIENTE,
      {
        Datos: {
                    nombre: ficha.nombre,
                    descripcion: ficha.descripcion,
                    foto: ficha.foto,
                    familia: ficha.familia,
                    calorias: ficha.calorias
                  },
      },
      {},
      'addIngrediente'
    ).pipe(
      map((result: any) => {
        console.log('-add-------------------------------------------');
        console.log(result);
        // return result.addIngrediente
        return result;
      })
    );
  }

  update(id: number, ficha: any) {
    return this.set(
      MODIFY_INGREDIENTE,
      {
        idSearch: id,
        Datos: {
          nombre: ficha.nombre,
          descripcion: ficha.descripcion,
          foto: ficha.foto,
          familia: ficha.familia,
          calorias: ficha.calorias
        },
      },
      {},
      'updateIngrediente'
    ).pipe(
      map((result: any) => {
        console.log('-update-------------------------------------------');
        console.log(result);
        return result;
      })
    );
  }
}
