import { Component, OnInit } from '@angular/core';
import { IResultData } from '@core/interfaces/result-data.interface';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { LISTA_USUARIOS_QUERY } from '@graphql/operations/query/usuario';
import { DocumentNode } from 'graphql';

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

}
