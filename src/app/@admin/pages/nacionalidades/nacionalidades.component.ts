import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { LISTA_NACIONALIDADES_QUERY } from '@graphql/operations/query/nacionalidad';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { formBasicDialog, nacionalidadFormBasicDialog } from '@shared/alerts/alerts';
import { NacionalidadesService } from './nacionalidades.service';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

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


  giveMeValue(campo: any, porDefecto: string = '')
  {
    return (campo !== undefined && campo !== null && campo !== '') ? campo : porDefecto;
  }

  private inicializeForm(nacionalidad: any, readonly: boolean = false)
  {
      const dCodigo = this.giveMeValue(nacionalidad.idNacionalidad);
      const dNombre = this.giveMeValue(nacionalidad.nombre);
      const dFoto =  this.giveMeValue(nacionalidad.icono, 'nofoto.jpg');
      let newHTML = '';

      if (readonly)
      {
        newHTML = `
        <div class="container p-3 my-3 border text-justify">
          <div class="Row"><b>Nombre:</b> ${dNombre}      </div>
          <br>
          <div class="Row"><b>COD:</b> ${dCodigo}  </div>
          <br>
          <div class="Row"><b>Escudo:</b> ${dFoto}  </div>
          <br>
          <div class="Row"><b>Escudo:</b> <img height="50px" src="/assets/img/banderas/${dFoto.toLowerCase()}"/>
          </div>
        </div>
      `;
      }
      else
      {
        newHTML = `
          <input id="nombre" value="${dNombre}" class="swal2-input" placeholder="Nombre" required>
          <input id="idNacionalidad" value="${dCodigo}" class="swal2-input" placeholder="Descripcion">
          <input id="icono" value="${dFoto}" class="swal2-input" placeholder="Familia">
        `;
      }
      console.log(newHTML);

      return newHTML;
  }

  async takeAction($event) {
    try {
      const accion = $event.accion;
      const datos = $event.datos;
      console.log(accion);
      console.log(datos);

      if (accion === 'add') {
        this.newNacionalidad(await nacionalidadFormBasicDialog('Añadir nacionalidad', this.inicializeForm(datos))
        );
      }
      if (accion === 'info') {
        this.editNacionalidad(await nacionalidadFormBasicDialog('Detalle de la nacionalidad', this.inicializeForm(datos, true), 1000)
        );
      }
      if (accion === 'edit') {
        this.editNacionalidad(await nacionalidadFormBasicDialog('Editar nacionalidad', this.inicializeForm(datos))
        );
      }
    } catch (error) {
      basicAlert(TYPE_ALERT.ERROR, error);
    }
  }

  newNacionalidad(result: any) {
    if (result.value) {
      console.log('* AÑADIR ====================================================');
      console.log(result);

      this.service.addNacionalidad(result.value).subscribe((res: any) => {
        console.log(res);

        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.mesage);
        } else {
          console.log(res);
          basicAlert(TYPE_ALERT.WARNING, res.message);
        }
      });
    } else {
      console.log('operacion cancelada');
    }
  }

  editNacionalidad(result: any) {
    console.log('* EDITAR ====================================================');
    console.log(result.value);

    console.log(result);
  }


}
