import { Injectable } from '@angular/core';
import { ADD_INGREDIENTE } from '@graphql/operations/mutation/ingrediente';
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

  addIngrediente(ficha: any) {
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
      {}
    ).pipe(
      map((result: any) => {
        return result.addIngrediente;
      })
    );
  }
}
