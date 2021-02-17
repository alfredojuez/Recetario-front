import { Injectable } from '@angular/core';
import { IRegisterForm } from '@core/interfaces/register.interface';
import { ADD_USUARIO } from '@graphql/operations/mutation/usuario';
import { LISTA_USUARIOS_QUERY } from '@graphql/operations/query/usuario';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  getUsuarios(page: number = 1, itemsPage: number = 15) {
    return this.get(LISTA_USUARIOS_QUERY,
                   { include: true,
                    page,
                    itemsPage
                  }).pipe(
      map((result: any) => {
        return result.ListadoUsuariosCompleto;
      })
    );
  }

  register(DatosUsuario: IRegisterForm) {
    return this.set(ADD_USUARIO,
      {
          DatosUsuario,
          include: false,
      }, {}, 'addUsuario')
      .pipe(
        map((result: any) => {
          return result.usuario;
        })
      );
  }
}
