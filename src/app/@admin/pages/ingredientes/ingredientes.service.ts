import { Injectable } from '@angular/core';
import { ADD_INGREDIENTE } from '@graphql/operations/mutation/ingrediente';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class IngredientesService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  addIngrediente(nombre: string)
  {
    return this.set(ADD_INGREDIENTE, {ingrediente: nombre}, {}).pipe(map((result: any) => {
      return result.addIngrediente;
    }));
  }
}
