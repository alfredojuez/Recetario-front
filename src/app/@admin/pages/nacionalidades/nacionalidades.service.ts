import { Injectable } from '@angular/core';
import { ADD_NACIONALIDAD } from '@graphql/operations/mutation/nacionalidad';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadesService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  addNacionalidad(nombre: string)
  {
    return this.set(ADD_NACIONALIDAD, {categoria: nombre}, {}).pipe(map((result: any) =>{
      return result.addNacionalidad;
    }));
  }
}
