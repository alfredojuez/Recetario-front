import { Component, Input, OnInit } from '@angular/core';
import { IInfoPage, IResultData } from '@core/interfaces/result-data.interface';
import { LISTA_USUARIOS_QUERY } from '@graphql/operations/query/usuario';
import { Observable } from 'rxjs/internal/Observable';
import { DocumentNode } from 'graphql';
import { map } from 'rxjs/internal/operators/map';
import { TablePaginationService } from './table-pagination.service';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit {

  @Input() query: DocumentNode; // = LISTA_USUARIOS_QUERY;
  @Input() context: object;
  @Input() itemsPage = 50;
  @Input() resultData: IResultData;
  @Input() include = true;

  infoPage: IInfoPage;

  // El símbolo del $ indica que es un observable
  data$: Observable<any>;
  // Any => asi vale para categorias, ingredientes...

  constructor(private service: TablePaginationService) { }

  ngOnInit(): void
  {
    if ((this.query === undefined))
    {
      throw new Error('Query is undefined');
    }

    if ((this.resultData === undefined))
    {
      throw new Error('ResultData is undefined');
    }

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
    const variables = {
      // página en la que estamos
      page: this.infoPage.page,
      // numero de items por página
      itemsPage: this.itemsPage,
      include: this.include,
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

}
