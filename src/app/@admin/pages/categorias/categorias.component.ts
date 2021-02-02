import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { LISTA_CATEGORIAS_QUERY } from '@graphql/operations/query/categoria';
import { ITableColumns } from '@core/interfaces/table-columns.interface';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  query: DocumentNode = LISTA_CATEGORIAS_QUERY;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  // include: boolean;
  columns: Array<ITableColumns>;

  constructor() { }

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 15;
    this.resultData = {
       definitionKey: 'ListadoCategorias',
       listKey: 'categorias',
    };
    // this.include = false;
    this.columns = [
      { property: 'idCategoria', label: '#', typeElement: ''},
      { property: 'nombre', label: 'Nombre de la categoría', typeElement: ''},
      { property: 'descripcion', label: 'descripcion', typeElement: ''},
      { property: 'foto', label: 'foto', typeElement: ''},
    ];
  }

}
