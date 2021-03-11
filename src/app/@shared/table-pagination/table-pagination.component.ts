import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IInfoPage, IResultData } from '@core/interfaces/result-data.interface';
import { Observable } from 'rxjs/internal/Observable';
import { DocumentNode } from 'graphql';
import { map } from 'rxjs/internal/operators/map';
import { TablePaginationService } from './table-pagination.service';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { USER_STATUS_FILTER } from '@core/constant/filters';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit, OnDestroy  {

  @Input() query: DocumentNode; // = LISTA_USUARIOS_QUERY;
  @Input() context: object;
  @Input() itemsPage = 15;
  @Input() resultData: IResultData;
  @Input() filterActiveValues: USER_STATUS_FILTER = USER_STATUS_FILTER.TODOS;
  @Input() include = true;
  @Input() tableColumns: Array<ITableColumns> = undefined;
  @Input() bloqueable = false;
  @Input() newData$: Observable<boolean>;

  @Output() manageItem = new EventEmitter<any>();

  infoPage: IInfoPage;
  // El símbolo del $ indica que es un observable
  data$: Observable<any>;
  newDataSubscription$: Subscription;
  // Any => asi vale para categorias, ingredientes...

  constructor(private service: TablePaginationService) { }

  ngOnInit(): void
  {

    console.log(`filtr: ${this.filterActiveValues}`);

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
    this.newDataSubscription$ = this.newData$.subscribe(_ => this.loadData());
  }

  ngOnDestroy(): void {
    if (this.newDataSubscription$) {
      this.newDataSubscription$.unsubscribe();
    }
  }

  loadData()
  {
    console.log('LEEMOS DATOS PARA LA TABLA');

    const variables = {
      page:       this.infoPage.page,
      itemsPage:  this.infoPage.itemsPage,
      include:    this.include,
      active:     this.filterActiveValues,
    };

    this.data$ = this.service.getCollectionData(this.query,  variables, {}, ).pipe(
      map((result: any) => {

        const data = result[this.resultData.definitionKey];
        this.infoPage = data.info;
        return data[this.resultData.listKey];
      }
    ));
  }

  // refreshData()
  // {
  //   this.loadData();
  // }

  pageChange()
  {
    this.loadData();
  }

  /**
   * Funcion que ejecuta las distintas acciones que tengamos definidas en la tabla
   * @param action  las acciones definidas son: add, info, edit, block y del
   * @param data    conjunto de datos sobre los que interactuar.
   */
  manageAction(action: string, data: any)
  {
    this.manageItem.emit({accion: action, datos: data});   // para enviar el dato al padre
  }

}
