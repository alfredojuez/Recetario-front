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

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 15;
    this.resultData = {
       definitionKey: 'ListadoUsuariosCompleto',
       listKey: 'usuarios',
    };
    this.include = true;
    this.columns = [
      { property: 'id', label: '#', typeElement: ''},
      { property: 'nombre', label: 'Nombre', typeElement: ''},
      { property: 'apellidos', label: 'Apellidos', typeElement: ''},
      { property: 'usuario', label: 'Usuario', typeElement: ''},
      { property: 'email', label: 'E-mail', typeElement: ''},
      { property: 'fecha_nacimiento', label: 'Cumpleaños', typeElement: ''},
      { property: 'nacionalidad', label: 'Nacionalidad', typeElement: ''},
      { property: 'ultimo_login', label: 'Última visita', typeElement: ''},
      { property: 'fecha_alta', label: 'Fecha de registro', typeElement: ''},
      { property: 'activo', label: 'Estado', typeElement: ''},
      { property: 'perfil', label: 'Perfil', typeElement: ''},
    ];
  }

}
