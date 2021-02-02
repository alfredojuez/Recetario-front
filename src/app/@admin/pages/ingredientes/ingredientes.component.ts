import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { LISTA_INGREDIENTES_QUERY } from '@graphql/operations/query/ingrediente';
import { ITableColumns } from '@core/interfaces/table-columns.interface';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.scss']
})
export class IngredientesComponent implements OnInit {
  query: DocumentNode = LISTA_INGREDIENTES_QUERY;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  // include: boolean;
  columns: Array<ITableColumns>;
  bloqueable: boolean;

  constructor() { }

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 15;
    this.resultData = {
       definitionKey: 'ListadoIngredientes',
       listKey: 'ingredientes',
    };
    this.bloqueable = false;
    // this.include = false;
    this.columns = [
      // { property: 'idIngrediente', label: '#', typeElement: 'TEXT'},
      { property: 'nombre', label: 'Nombre', typeElement: 'TEXT'},
      // { property: 'descripcion', label: 'Descripción', typeElement: 'TEXT'},
      { property: 'familia', label: 'Familia', typeElement: ''},
      // { property: 'foto', label: 'Foto', typeElement: 'IMG'},
      // { property: 'calorias', label: 'Calorias', typeElement: 'TEXT'},
    ];
  }
}
