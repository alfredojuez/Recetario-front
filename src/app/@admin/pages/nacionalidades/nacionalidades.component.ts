import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { LISTA_NACIONALIDADES_QUERY } from '@graphql/operations/query/nacionalidad';
import { ITableColumns } from '@core/interfaces/table-columns.interface';

@Component({
  selector: 'app-nacionalidades',
  templateUrl: './nacionalidades.component.html',
  styleUrls: ['./nacionalidades.component.scss']
})
export class NacionalidadesComponent implements OnInit {
  query: DocumentNode = LISTA_NACIONALIDADES_QUERY;
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
       definitionKey: 'ListadoNacionalidades',
       listKey: 'nacionalidades',
    };
    // this.include = false;
    this.columns = [
      { property: 'icono', label: 'Icono', typeElement: 'IMG'},
      { property: 'idNacionalidad', label: 'Código', typeElement: ''},
      { property: 'nombre', label: 'Nombre', typeElement: ''},
    ];
  }
}
