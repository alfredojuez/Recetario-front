import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { LISTA_INGREDIENTES_QUERY } from '@graphql/operations/query/ingrediente';

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

  constructor() { }

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 15;
    this.resultData = {
       definitionKey: 'ListadoIngredientes',
       listKey: 'ingredientes',
    };
    // this.include = false;
  }

}
