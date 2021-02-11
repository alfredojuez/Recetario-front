import { Component, OnInit } from '@angular/core';
import { IResultData } from '@core/interfaces/result-data.interface';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { LISTA_USUARIOS_QUERY } from '@graphql/operations/query/usuario';
import { confirmDetailBasic, infoDetailBasic, usuarioFormBasicDialog } from '@shared/alerts/alerts';
import { topRightAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { giveMeValue } from '@shared/functions/data-functions';
import { DocumentNode } from 'graphql';
import { UsuariosService } from './usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  query: DocumentNode = LISTA_USUARIOS_QUERY;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>;
  bloqueable: boolean;

  constructor(private service: UsuariosService) { }
  
  iconosPerfil = {
    USER: '<i class="fab fa-creative-commons-by text-dark fa-2x" title="Usuario"></i>',
    ADMIN: '<i class="fas fa-address-card text-primary fa-2x" title="Administrador"></i>',
    COOKER: '<i class="fas fa-award text-success fa-2x" title="Cocinero"></i>'
    };

  ngOnInit(): void
  {
    this.context = {};
    this.itemsPage = 15;
    this.resultData = {
       definitionKey: 'ListadoUsuariosCompleto',
       listKey: 'usuarios',
    };

    console.log(this.bloqueable);

    this.bloqueable = true;   // indica si queremos el boton de bloqueo

    this.include = true;
    this.columns = [
      { property: 'activo', label: 'Estado', typeElement: 'ACTIVE'},
      { property: 'usuario', label: 'Usuario', typeElement: 'TEXT'},
      { property: 'email', label: 'E-mail', typeElement: 'TEXT'},
      { property: 'perfil', label: 'Perfil', typeElement: 'ICON'},
    ];
  }

  /**
   * Formulario solo lectura con la información del usuario
   * @param usuario  Datos a mostrar en el formulario
   */
  private infoForm(usuario: any) 
  {
    return `
    <div class="row">
      <div class="col-7">
            <div class="container p-3 my-3 text-justify">
                <div class="Row"><b>email:</b> ${giveMeValue(usuario.email)}              </div>            <br>
                <div class="Row"><b>Nombre:</b> ${giveMeValue(usuario.nombre)}            </div>            <br>
                <div class="Row"><b>Apellidos:</b> ${giveMeValue(usuario.apellidos)}      </div>            <br>
                <div class="Row"><b>Usuario:</b> ${giveMeValue(usuario.usuario)}          </div>            <br>
                <div class="Row"><b>Fecha de nacimiento:</b> ${giveMeValue(usuario.fecha_nacimiento)}</div> <br>
                <div class="Row"><b>Nacionalidad:</b> ${giveMeValue(usuario.nacionalidad)}</div>            <br>
            </div>
      </div>
      <div class="col-4">
        <div>
        <br>
            <div class="Row"><h3>Perfil: ${this.iconosPerfil[giveMeValue(usuario.perfil)]}</h3></div>
            <br>
            <img height="250px" src="/assets/img/usuarios/${giveMeValue(usuario.foto, 'no-avatar.png').toLowerCase()}"/>
        </div>
      </div>

    </div>
        `;
  }

  /**
   * Inicializamos el codigo de formulario para el usuario
   * @param usuario       Objeto de BD con la información a mostrar
   */
  private inicializeForm(usuario: any) {
    return `
    <input id="email" value="${giveMeValue(usuario.email)}"                       class="mb-1 swal2-input" placeholder="Email" required>
    <input id="usuario" value="${giveMeValue(usuario.usuario)}"                   class="mb-1 swal2-input" placeholder="Usuario" required>
    <input type="password" id="pass" value="${giveMeValue(usuario.pass)}"         class="mb-1 swal2-input" placeholder="Contraseña" required>

    <input id="nombre" value="${giveMeValue(usuario.nombre)}"                     class="mb-1 swal2-input" placeholder="Nombre" required>
    <input id="apellidos" value="${giveMeValue(usuario.apellidos)}"               class="mb-1 swal2-input" placeholder="Apellidos">
    <input id="fecha_nacimiento" value="${giveMeValue(usuario.fecha_nacimiento)}" class="mb-1 swal2-input" placeholder="FechaNacimiento" required>

    <input id="nacionalidad" value="${giveMeValue(usuario.nacionalidad)}"         class="mb-1 swal2-input" placeholder="Nacionalidad">
    <input id="perfil" value="${giveMeValue(usuario.perfil)}"                     class="mb-1 swal2-input" placeholder="Perfil">
    <input id="foto" value="${giveMeValue(usuario.foto, 'no-avatar.png')}"        class="mb-1 swal2-input" placeholder="Foto">
    `;
  }

  /**
   * Generamos el codigo del título con el icono del usuario
   * @param texto   Nombre de la acción que estemos haciendo
   */
  private getTitulo(texto: string) {
    return `<div>${texto} - <i class="fas fa-sitemap"></i> </div>`;
  }

  /**
   * Cada uno de los botones de la tabla lanzará una acción, aquí las recogemos todas y las procesamos
   * @param $event  Objeto con la tupla acción y datos del registro.
   */
  async takeAction($event: any)
  {
    const accion = $event.accion;
    const datos = $event.datos;
    switch (accion)
    {
      case 'info':
        infoDetailBasic(this.getTitulo('Detalle del usuario'), this.infoForm(datos), 800);
        break;
      case 'add':
        this.addUsuario(
          await usuarioFormBasicDialog('Añadir usuario', this.inicializeForm(datos)
          )
        );
        break;
      case 'edit':
        this.updateUsuario(datos.id,
          await usuarioFormBasicDialog('Editar usuario', this.inicializeForm(datos)
          )
        );
        break;
      case 'del':
        this.deleteUsuario(datos.id, await confirmDetailBasic(this.getTitulo('Eliminación de usuario'), this.infoForm(datos), 'Eliminar usuario', 'Cancelar', 800));
        break;
      case 'block':
        const textoAccion = (datos.activo) ? 'Bloquear' : 'Desbloquear';
        // tslint:disable-next-line: max-line-length
        this.blockUsuario(datos, await confirmDetailBasic(this.getTitulo('Bloqueo/desbloqueo de usuario'), this.infoForm(datos), textoAccion, 'Cancelar', 800));
        break;
    }
  }

  // newUsuario(result: any) {
  //   if (result.value) {
  //     console.log('* AÑADIR ====================================================');
  //     console.log(result);

  //     this.service.add(result.value).subscribe((res: any) => {
  //       console.log(res);

  //       if (res.status) {
  //         basicAlert(TYPE_ALERT.SUCCESS, res.message);
  //       } else {
  //         console.log(res);
  //         basicAlert(TYPE_ALERT.WARNING, res.message);
  //       }
  //     });
  //   } else {
  //     console.log('operacion cancelada');
  //   }
  // }

  // editUsuario(result: any) {
  //   console.log('* EDITAR ====================================================');
  //   console.log(result.value);

  //   console.log(result);
  // }

  /**
   * Añadimos una nueva categoría
   * @param result  Respuesta dada en el modal de solicitud de datos.
   */
  addUsuario(result: any) {
    if (result.isConfirmed && result.value) {
        // llamamos al sercicio de creacion del registro
        this.service.add(result.value).subscribe((res: any) =>
        {
          (res.status)
            ? topRightAlert(TYPE_ALERT.SUCCESS, res.message)
            : topRightAlert(TYPE_ALERT.WARNING, res.message);
        });
    } else {
      topRightAlert(TYPE_ALERT.INFO, 'Operación cancelada');
    }
  }

  /**
   * Actualizamos los datos de la ficha seleccionada
   * @param id      ID del registro a actualizar
   * @param result  Datos obtenidos del formulario de edición
   */
  updateUsuario(id: number, result: any) {
    if (result.isConfirmed && result.value) {
      this.service.update(id, result.value).subscribe((res: any) => {
        (res.status)
        ? topRightAlert(TYPE_ALERT.SUCCESS, res.message)
        : topRightAlert(TYPE_ALERT.WARNING, res.message);
      });
    } else {
      topRightAlert(TYPE_ALERT.INFO, 'Operación cancelada');
    }
  }

  /**
   * Eliminamos un registro de la BD si se puede
   * @param id      ID del registro a eliminar
   * @param result  Resultado del modal para la confirmación de la eliminación
   */
  deleteUsuario(id: number, result: boolean) {
    if (result) {
      this.service.delete(id).subscribe((res: any) => {
        (res.status)
        ? topRightAlert(TYPE_ALERT.SUCCESS, res.message)
        : topRightAlert(TYPE_ALERT.WARNING, res.message);
      });
    } else {
      topRightAlert(TYPE_ALERT.INFO, 'Operacion cancelada');
    }
  }

  /**
   * Eliminamos un registro de la BD si se puede
   * @param id      ID del registro a eliminar
   * @param result  Resultado del modal para la confirmación de la eliminación
   */
  blockUsuario(datos: any, result: boolean) {
    if (result)
    {
      // NO confirmamos primero si hay que bloquear o desbloquear el usuario
      // porque lo que hacemos es cambiar el estado.
      this.service.block(datos.id, datos).subscribe((res: any) => {
        (res.status)
        ? topRightAlert(TYPE_ALERT.SUCCESS, res.message)
        : topRightAlert(TYPE_ALERT.WARNING, res.message);
      });
    } else {
      topRightAlert(TYPE_ALERT.INFO, 'Operación cancelada');
    }
  }

}
