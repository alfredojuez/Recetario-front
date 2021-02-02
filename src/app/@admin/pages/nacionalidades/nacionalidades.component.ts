import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { LISTA_NACIONALIDADES_QUERY } from '@graphql/operations/query/nacionalidad';

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

  constructor() { }

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 15;
    this.resultData = {
       definitionKey: 'ListadoNacionalidades',
       listKey: 'nacionalidades',
    };
    // this.include = false;
  }

}
