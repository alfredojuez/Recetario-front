import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { LISTA_NACIONALIDADES_QUERY } from '@graphql/operations/query/nacionalidad';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { formBasicDialog } from '@shared/alerts/alerts';
import { NacionalidadesService } from './nacionalidades.service';

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
  bloqueable: boolean;

  constructor(private service: NacionalidadesService) { }

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 15;
    this.resultData = {
       definitionKey: 'ListadoNacionalidades',
       listKey: 'nacionalidades',
    };
    this.bloqueable = false;

    // this.include = false;
    this.columns = [
      { property: 'icono', label: 'Icono', typeElement: 'IMG'},
      { property: 'idNacionalidad', label: 'Código', typeElement: 'TEXT'},
      { property: 'nombre', label: 'Nombre', typeElement: 'TEXT'},
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
      this.service.addNacionalidad((await result).value).subscribe(
        (res: any) => {
          console.log(res);
        }
      );
    }
  }

}
