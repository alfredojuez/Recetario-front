import { variable } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { IRegisterForm } from '@core/interfaces/register.interface';
import { REGISTER_USER } from '@graphql/operations/mutation/usuario';
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

  getUsuarios(page: number = 1, itemsPage: number = 50) {
    return this.get(LISTA_USUARIOS_QUERY,
                   { include: true,
                    page,
                    itemsPage
                  }).pipe(
      map((result: any) => {
        return result.ListadoUsuarios;
      })
    );
    /*
    Devolvemos result.ListadoUsuarios, porque el graphQL devuelve esta respuesta:
    {
      "data": {
        "ListadoUsuarios": {
          "status": true,
          "message": "Lista de usuarios leida correctamente, total de registros: 3",
          "Usuarios": [
            {
              "id": "1",
              ....
      Y queremos obtener el resultado data.ListadoUsuarios directamente.
    */
  }

  register(DatosUsuario: IRegisterForm) {
    return this.set(REGISTER_USER,
      {
          DatosUsuario,
          include: false,
      })
      .pipe(
        map((result: any) => {
          return result.register;
        })
      );
  }
}
