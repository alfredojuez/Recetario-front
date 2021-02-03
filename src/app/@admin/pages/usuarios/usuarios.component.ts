import { Component, OnInit } from '@angular/core';
import { IResultData } from '@core/interfaces/result-data.interface';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { LISTA_USUARIOS_QUERY } from '@graphql/operations/query/usuario';
import { formBasicDialog } from '@shared/alerts/alerts';
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

  async takeAction($event){
    const accion = $event.accion;
    const datos = $event.datos;
    console.log('====================================================');
    console.log('EN EL PADRE');
    console.log(accion);
    console.log(datos);

    const html = '<input id="nombre" class="swal2-input">';

    if (accion === 'add')
    {
      const result = formBasicDialog('Añadir usuario', html, 'nombre');
      console.log(result);
      this.service.addUsuario((await result).value).subscribe(
        (res: any) => {
          console.log(res);
        }
      );
    }
  }

}
