import { Component, OnInit } from '@angular/core';
import { IResultData } from '@core/interfaces/result-data.interface';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { LISTA_USUARIOS_QUERY } from '@graphql/operations/query/usuario';
import { usuarioFormBasicDialog } from '@shared/alerts/alerts';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
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

  ngOnInit(): void
  {
    this.context = {};
    this.itemsPage = 15;
    this.resultData = {
       definitionKey: 'ListadoUsuariosCompleto',
       listKey: 'usuarios',
    };

    console.log(this.bloqueable);

    this.bloqueable = true;

    this.include = true;
    this.columns = [
      { property: 'activo', label: 'Estado', typeElement: 'ACTIVE'},
      // { property: 'id', label: '#', typeElement: 'TEXT'},
      // { property: 'nombre', label: 'Nombre', typeElement: 'TEXT'},
      // { property: 'apellidos', label: 'Apellidos', typeElement: 'TEXT'},
      { property: 'usuario', label: 'Usuario', typeElement: 'TEXT'},
      { property: 'email', label: 'E-mail', typeElement: 'TEXT'},
      // { property: 'foto', label: 'Avatar', typeElement: 'IMG'},
      // { property: 'fecha_nacimiento', label: 'Cumpleaños', typeElement: 'TEXT'},
      // { property: 'nacionalidad', label: 'Nacionalidad', typeElement: 'TEXT'},
      // { property: 'ultimo_login', label: 'Última visita', typeElement: 'TEXT'},
      // { property: 'fecha_alta', label: 'Fecha de registro', typeElement: 'TEXT'},
      { property: 'perfil', label: 'Perfil', typeElement: 'ICON'},
    ];
  }


  giveMeValue(campo: any, porDefecto: string = '')
  {
    return (campo !== undefined && campo !== null && campo !== '') ? campo : porDefecto;
  }

  private inicializeForm(usuario: any, readonly: boolean = false)
  {
      const dEmail =            this.giveMeValue(usuario.email);
      const dNombre =           this.giveMeValue(usuario.nombre);
      const dApellidos =        this.giveMeValue(usuario.apellidos);
      const dUsuario =          this.giveMeValue(usuario.usuario);
      const dPass =             this.giveMeValue(usuario.pass);
      const dFechaNacimiento =  this.giveMeValue(usuario.fecha_nacimiento);
      const dNacionalidad =     this.giveMeValue(usuario.nacionalidad);
      const dPerfil =           this.giveMeValue(usuario.perfil);
      const dFoto =             this.giveMeValue(usuario.foto, 'no-avatar.png');

      let newHTML = '';

      if (readonly)
      {
        newHTML = `
        <div class="container p-3 my-3 border text-justify">
        <div class="Row"><b>email:</b> ${dEmail}      </div>
        <br>
        <div class="Row"><b>Nombre:</b> ${dNombre}      </div>
        <br>
        <div class="Row"><b>Apellidos:</b> ${dApellidos}      </div>
        <br>
        <div class="Row"><b>Usuario:</b> ${dUsuario}      </div>
        <br>
        <div class="Row"><b>Fecha de nacimiento:</b> ${dFechaNacimiento}      </div>
        <br>
        <div class="Row"><b>Nacionalidad:</b> ${dNacionalidad}      </div>
        <br>
        <div class="Row"><b>Perfil:</b> ${dPerfil}      </div>
        <br>
        <div class="Row"><b>Avatar:</b> <img height="250px" src="/assets/img/usuarios/${dFoto.toLowerCase()}"/>
        </div>
      `;
      }
      else
      {
        newHTML = `
          <input id="email" value="${dEmail}"                       class="mb-1 swal2-input" placeholder="Email" required>
          <input id="usuario" value="${dUsuario}"                   class="mb-1 swal2-input" placeholder="Usuario" required>
          <input type="password" id="pass" value="${dPass}"         class="mb-1 swal2-input" placeholder="Contraseña" required>

          <input id="nombre" value="${dNombre}"                     class="mb-1 swal2-input" placeholder="Nombre" required>
          <input id="apellidos" value="${dApellidos}"               class="mb-1 swal2-input" placeholder="Apellidos">
          <input id="fecha_nacimiento" value="${dFechaNacimiento}"  class="mb-1 swal2-input" placeholder="FechaNacimiento" required>

          <input id="nacionalidad" value="${dNacionalidad}"         class="mb-1 swal2-input" placeholder="Nacionalidad">
          <input id="perfil" value="${dPerfil}"                     class="mb-1 swal2-input" placeholder="Perfil">
          <input id="foto" value="${dFoto}"                         class="mb-1 swal2-input" placeholder="Foto">
          `;
      }
      console.log(newHTML);

      return newHTML;
  }

  async takeAction($event) {
    try {
      const accion = $event.accion;
      const datos = $event.datos;
      console.log(accion);
      console.log(datos);

      if (accion === 'add') {
        this.newUsuario(await usuarioFormBasicDialog('Añadir usuario', this.inicializeForm(datos))
        );
      }
      if (accion === 'info') {
        this.editUsuario(await usuarioFormBasicDialog('Detalle del usuario', this.inicializeForm(datos, true))
        );
      }
      if (accion === 'edit') {
        this.editUsuario(await usuarioFormBasicDialog('Editar usuario', this.inicializeForm(datos))
        );
      }
    } catch (error) {
      basicAlert(TYPE_ALERT.ERROR, error);
    }
  }

  newUsuario(result: any) {
    if (result.value) {
      console.log('* AÑADIR ====================================================');
      console.log(result);

      this.service.add(result.value).subscribe((res: any) => {
        console.log(res);

        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
        } else {
          console.log(res);
          basicAlert(TYPE_ALERT.WARNING, res.message);
        }
      });
    } else {
      console.log('operacion cancelada');
    }
  }

  editUsuario(result: any) {
    console.log('* EDITAR ====================================================');
    console.log(result.value);

    console.log(result);
  }

}
