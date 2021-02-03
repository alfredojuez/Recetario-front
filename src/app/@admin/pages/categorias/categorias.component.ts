import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { LISTA_CATEGORIAS_QUERY } from '@graphql/operations/query/categoria';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { formBasicDialog } from '@shared/alerts/alerts';
import { CategoriasService } from './categorias.service';

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
  bloqueable: boolean;

  constructor(private service: CategoriasService) { }

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 15;
    this.resultData = {
       definitionKey: 'ListadoCategorias',
       listKey: 'categorias',
    };
    this.bloqueable = false;

    // this.include = false;
    this.columns = [
      // { property: 'idCategoria', label: '#', typeElement: 'TEXT'},
      { property: 'nombre', label: 'Nombre de la categoría', typeElement: 'TEXT'},
      { property: 'descripcion', label: 'descripcion', typeElement: 'TEXT'},
      // { property: 'foto', label: 'foto', typeElement: 'IMG'},
    ];
  }

  async takeAction($event){
    const accion = $event.accion;
    const datos = $event.datos;
    console.log('====================================================');
    console.log('EN EL PADRE');
    console.log(accion);
    console.log(datos);

    const html = '<input id="nombre" class="swal2-input">';

    if (accion === 'add')
    {
      const result = formBasicDialog('Añadir usuario', html, 'nombre');
      console.log('* ====================================================');
      console.log(result);
      console.log('* ====================================================');
      this.service.addCategoria((await result).value).subscribe(
        (res: any) => {
          console.log(res);
        }
      );
    }
  }

}
