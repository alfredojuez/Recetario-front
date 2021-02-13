import { Component, OnInit } from '@angular/core';
import { IResultData } from '@core/interfaces/result-data.interface';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { LISTA_USUARIOS_QUERY } from '@graphql/operations/query/usuario';
import { confirmDetailBasic, infoDetailBasic, usuarioFormBasicDialog } from '@shared/alerts/alerts';
import { topRightAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { DateISO2Normal, giveMeValue } from '@shared/functions/data-functions';
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
    <hr>
    <div class="row">
      <div class="col-7">
            <div class="container p-3 my-3 text-justify">
                <div class="Row"><b>email:</b> ${giveMeValue(usuario.email)}              </div>            <br>
                <div class="Row"><b>Nombre:</b> ${giveMeValue(usuario.nombre)}            </div>            <br>
                <div class="Row"><b>Apellidos:</b> ${giveMeValue(usuario.apellidos)}      </div>            <br>
                <div class="Row"><b>Usuario:</b> ${giveMeValue(usuario.usuario)}          </div>            <br>
                <div class="Row"><b>Fecha de nacimiento:</b> ${DateISO2Normal(giveMeValue(usuario.fecha_nacimiento))}</div> <br>
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
    <hr>
        `;
  }

  /**
   * Inicializamos el codigo de formulario para el usuario
   * @param usuario       Objeto de BD con la información a mostrar
   */
  private inicializeForm(usuario: any) {

    // Logica de los roles
    const roles = new Array(3);
    roles[0] = giveMeValue(usuario.perfil, '') === 'USER' ? 'selected' : '';
    roles[1] = giveMeValue(usuario.perfil, '') === 'COOKER' ? 'selected' : '';
    roles[2] = giveMeValue(usuario.perfil, '') === 'ADMIN' ? 'selected' : '';

    const nacionalidades = [{idNacionalidad: '001', nombre: 'n001'},
                            {idNacionalidad: '002', nombre: 'n002'}
                            ];

    return `
    <div class="container">
    <hr>
    <table border = 0 width="100%">

      <tr>
        <td>Email:</td>
        <td>
          <input type="text" class="mb-1 swal2-input" placeholder="Correo electrónico" name="email"
                  title="Sólo lo usaremos para notificarte lo que nos pidas, y para hacer login"
                  id="email" value="${giveMeValue(usuario.email)}" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$" required/>
        </td>
      </tr>

     <tr>
        <td>Usuario:</td>
        <td>
          <input  type="text" class="mb-1 swal2-input" placeholder="Nombre de usuario" name="usuario"
                  title="Servirá para hacer login, y para poder identificar tus recetas"
                  id="usuario" value="${giveMeValue(usuario.usuario)}" required/>
        </td>
      </tr>

      <tr>
        <td>Contraseña:</td>
        <td>
          <input  type="text" class="mb-1 swal2-input" placeholder="Contraseña" name="pass"
                  id="pass" value="${giveMeValue(usuario.pass)}" />
        </td>
      </tr>

      <tr>
        <td width=150px>Nombre:      </td>
        <td width="*">
          <input  type="text" class="mb-1 swal2-input" placeholder="Nombre" name="nombre"
                  title="Sólo se mostrará en caso de que decidas firmar tus recetas con tu nombre en lugar del con el usuario"
                  id="nombre" value="${giveMeValue(usuario.nombre)}" required/>
        </td>
      </tr>

      <tr>
      <td>Apellidos:    </td>
      <td>
          <input  type="text" class="mb-1 swal2-input" placeholder="Apellidos" name="apellidos"
                  title="Si tenemos tu apellido y firmas con el nombre, este se añadirá"
                  id="apellidos" value="${giveMeValue(usuario.apellidos)}"/>
      </td>
      </tr>

      <tr>
      <td>Nacionalidad:</td>
      <td>
        <input  type="text" class="mb-1 swal2-input" placeholder="Nacionalidad" name="nacionalidad"
                title="Sólo lo usaremos para indicar por defecto el pais de origen de las recetas"
                id="nacionalidad" value="${giveMeValue(usuario.nacionalidad)}"/>

                <! -- HAY QUE ABRIR UN NUEVO SWALDIALOG PREGUNTANDO LA NACIONALIDAD. -->
    </div>
      </td>
      </tr>

      <tr>
      <td>Perfil:</td>
      <td>
          <select id="perfil" class="swal2-input">
            <option value="USER" ${roles[0]}>Usuario normal</option>
            <option value="COOKER" ${roles[1]}>Cocinero</option>
            <option value="ADMIN" ${roles[2]}>Administrador</option>
          </select>
      </td>
      </tr>

      <tr>
        <td>Cumpleaños:</td>
        <td>
          <div>
            <input  type="text" class="mb-1 swal2-input" placeholder="Fecha de nacimiento" name="nacionalidad"
                    title="Usamos tu cumpleaños para poder felicitarte y conocer la edad de nuestros cocineros y comensales"
                    id="fecha_nacimiento" value="${DateISO2Normal(giveMeValue(usuario.fecha_nacimiento))}" required />
            </div>
        </td>
      </tr>
    </table>
    </div>

    <hr>

  `;
  }

  /**
   * Generamos el codigo del título con el icono del usuario
   * @param texto   Nombre de la acción que estemos haciendo
   */
  private getTitulo(texto: string) {
    return `<div>${texto} - <i class="fas fa-users"></i> </div>`;
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
        infoDetailBasic(this.getTitulo('Información de usuario'), this.infoForm(datos), 800);
        break;
      case 'add':
        this.addUsuario( await usuarioFormBasicDialog(this.getTitulo('Nuevo usuario'), this.inicializeForm(datos))
        );
        break;
      case 'edit':
        this.updateUsuario(datos.id, await usuarioFormBasicDialog(this.getTitulo('Editar usuario'), this.inicializeForm(datos), 600) );
        break;
      case 'del':
        this.deleteUsuario(datos.id, await confirmDetailBasic(this.getTitulo('Eliminar usuario'), this.infoForm(datos), 'Eliminar usuario', 'Cancelar', 800));
        break;
      case 'block':
        const textoAccion = (datos.activo) ? 'Bloquear' : 'Desbloquear';
        this.blockUsuario(datos, await confirmDetailBasic(this.getTitulo('Bloquear/desbloquear usuario'), this.infoForm(datos), textoAccion, 'Cancelar', 800));
        break;
    }
  }

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
