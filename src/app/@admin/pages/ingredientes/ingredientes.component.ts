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

  constructor() { }

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 15;
    this.resultData = {
       definitionKey: 'ListadoIngredientes',
       listKey: 'ingredientes',
    };
    // this.include = false;
    this.columns = [
      { property: 'idIngrediente', label: '#', typeElement: ''},
      { property: 'nombre', label: 'Nombre', typeElement: ''},
      { property: 'descripcion', label: 'Descripción', typeElement: ''},
      { property: 'familia', label: 'Familia', typeElement: ''},
      { property: 'foto', label: 'Foto', typeElement: ''},
      { property: 'calorias', label: 'Calorias', typeElement: ''},
    ];
  }
}
