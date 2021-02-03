import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { LISTA_INGREDIENTES_QUERY } from '@graphql/operations/query/ingrediente';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { formBasicDialog } from '@shared/alerts/alerts';
import { IngredientesService } from './ingredientes.service';

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

  constructor(private service: IngredientesService) {
   }

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
       { property: 'descripcion', label: 'Descripción', typeElement: 'TEXT'},
      // { property: 'familia', label: 'Familia', typeElement: ''},
      // { property: 'foto', label: 'Foto', typeElement: 'IMG'},
      // { property: 'calorias', label: 'Calorias', typeElement: 'TEXT'},
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
      console.log(result);
      this.service.addIngrediente((await result).value).subscribe(
        (res: any) => {
          console.log(res);
        }
      );
    }
  }

}
