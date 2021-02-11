import { Injectable } from '@angular/core';
import { ADD_USUARIO, BLOCK_USER, DELETE_USUARIO, MODIFY_USUARIO, UNBLOCK_USER } from '@graphql/operations/mutation/usuario';
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

  add(ficha: any) {
    return this.set(
      ADD_USUARIO,
      {
        DatosUsuario: {
          email: ficha.email,
          nombre: ficha.nombre,
          apellidos: ficha.apellidos,
          usuario: ficha.usuario,
          pass: ficha.pass,
          fecha_nacimiento: ficha.fecha_nacimiento,
          foto: ficha.foto,
          nacionalidad: ficha.nacionalidad,
          perfil: ficha.perfil,
        },
        include: false,
      },
      {},
      'addUsuario'
    ).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  update(id: number, ficha: any) {
    return this.set(
      MODIFY_USUARIO,
      {
        idSearch: id,
        Datos: {
          email: ficha.email,
          nombre: ficha.nombre,
          apellidos: ficha.apellidos,
          usuario: ficha.usuario,
          pass: ficha.pass,
          fecha_nacimiento: ficha.fecha_nacimiento,
          foto: ficha.foto,
          nacionalidad: ficha.nacionalidad,
          perfil: ficha.perfil,
        },
      },
      { },
      'updateUsuario',
    ).pipe(map((result: any) => {
        return result;
      })
    );
  }

  block(idUsuario: number, ficha: any) {
    const estadoActual = ficha.activo;
    const ACCION = estadoActual ? BLOCK_USER : UNBLOCK_USER;
    const ELEMENTO = estadoActual ? 'blockUsuario' : 'unblockUsuario';

    return this.set(
      ACCION,
      { idUsuario },
      {},
      ELEMENTO
    ).pipe(map((result: any) => {
        console.log('bloqueador');
        console.log(result);
        return result;
      })
    );
  }

  delete(id: number) {
    console.log(`ID: ${id}`);
    return this.set(
      DELETE_USUARIO,
      {
        id,
      },
      {},
      'deleteUsuario'
    ).pipe(map((result: any) => {
        return result;
      })
    );
  }

}
