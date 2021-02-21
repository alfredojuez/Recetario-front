import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegisterForm } from '@core/interfaces/register.interface';
import { ACTIVATE_USUARIO, ADD_USUARIO, CHANGE_PASSWORD, RESET_PASSWORD_EMAIL } from '@graphql/operations/mutation/usuario';
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
          return result;
        })
      );
  }

  activate(token: string, pass: string) {
    // cojemos la parte central del token aa.bbbbbbb.ccc
    const usuario = JSON.parse(atob(token.split('.')[1])).usuario;

    return this.set(ACTIVATE_USUARIO,
      {
          idUsuario: usuario.id,
          pass,
          include: false
      },
      {
        headers: new HttpHeaders({
          Authorization: token
        })
      }, 'activateUserAction')
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  resetPassMail(email: string)
  {
    return this.set(RESET_PASSWORD_EMAIL,
      {
          email,
      }, {}, 'resetPasswordEmail')
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  changePass(token: string, pass: string)
  {
    const idUsuario = JSON.parse(atob(token.split('.')[1])).usuario.id;

    return this.set(CHANGE_PASSWORD,
      {
          idUsuario,
          pass,
      },
      {
        headers: new HttpHeaders({
          Authorization: token
        })
      }, 'resetPasswordAction')
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

}
