import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IInfoPage, IResultData } from '@core/interfaces/result-data.interface';
import { LISTA_USUARIOS_QUERY } from '@graphql/operations/query/usuario';
import { Observable } from 'rxjs/internal/Observable';
import { DocumentNode } from 'graphql';
import { map } from 'rxjs/internal/operators/map';
import { TablePaginationService } from './table-pagination.service';
import { ITableColumns } from '@core/interfaces/table-columns.interface';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit {

  @Input() query: DocumentNode; // = LISTA_USUARIOS_QUERY;
  @Input() context: object;
  @Input() itemsPage = 15;
  @Input() resultData: IResultData;
  @Input() include = true;
  @Input() tableColumns: Array<ITableColumns> = undefined;
  @Input() bloqueable = false;

  @Output() manageItem = new EventEmitter<Array<any>>();

  infoPage: IInfoPage;
  // El símbolo del $ indica que es un observable
  data$: Observable<any>;
  // Any => asi vale para categorias, ingredientes...

  constructor(private service: TablePaginationService) { }

  ngOnInit(): void
  {
    if ((this.query === undefined))          {      throw new Error('Query is undefined');        }
    if ((this.resultData === undefined))     {      throw new Error('ResultData is undefined');   }
    if ((this.tableColumns === undefined))   {      throw new Error('tableColumns is undefined');   }

    this.infoPage =
    {
      page: 1,
      itemsPage: this.itemsPage,
      totalItems: 1,
      totalPages: 1,
    };
    this.loadData();
  }

  loadData()
  {
    console.log('Llamada a loadData - Recargamos los datos...');
    console.log(this.infoPage.itemsPage);
    const variables = {
      page:       this.infoPage.page,
      itemsPage:  this.infoPage.itemsPage,
      include:    this.include,
    };

    this.data$ = this.service.getCollectionData(this.query,  variables, {}, ).pipe(
      map((result: any) => {
        const data = result[this.resultData.definitionKey];
        this.infoPage = data.info;
        return data[this.resultData.listKey];
      }
    ));
  }

  pageChange()
  {
    console.log(this.infoPage.page);
    this.loadData();
  }

  /**
   * Funcion que ejecuta las distintas acciones que tengamos definidas en la tabla
   * @param action  las acciones definidas son: add, info, edit, block y del
   * @param data    conjunto de datos sobre los que interactuar.
   */
  manageAction(action: string, data: any)
  {
    console.log('====================================================')
    console.log('EN EL HIJO')
    console.log(action, data);
    
    this.manageItem.emit([action, data]);   // para enviar el dato al padre
  }

}
