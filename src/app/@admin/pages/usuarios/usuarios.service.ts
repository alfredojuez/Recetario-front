import { Injectable } from '@angular/core';
import { ADD_USUARIO } from '@graphql/operations/mutation/usuario';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  addUsuario(ficha: any) {
    return this.set(
      ADD_USUARIO,
      {
        Datos: {
          email: ficha.email,
          nombre: ficha.nombre,
          apellidos: ficha.apellidos,
          usuario: ficha.usuario,
          fecha_nacimiento: ficha.fecha_nacimiento,
          foto: ficha.foto,
          nacionalidad: ficha.nacionalidad,
          perfil: ficha.perfil,
        },
      },
      {}
    ).pipe(
      map((result: any) => {
        return result.addUsuario;
      })
    );
  }
}
