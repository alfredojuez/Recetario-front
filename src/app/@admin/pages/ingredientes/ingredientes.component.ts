import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { LISTA_INGREDIENTES_QUERY } from '@graphql/operations/query/ingrediente';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { formBasicDialog, ingredienteFormBasicDialog } from '@shared/alerts/alerts';
import { IngredientesService } from './ingredientes.service';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

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

  giveMeValue(campo: any, porDefecto: string = '')
  {
    return (campo !== undefined && campo !== null && campo !== '') ? campo : porDefecto;
  }

  private inicializeForm(ingrediente: any, readonly: boolean = false)
  {
      const dNombre = this.giveMeValue(ingrediente.nombre);
      const dDescripcion = this.giveMeValue(ingrediente.descripcion);
      const dFamilia = this.giveMeValue(ingrediente.familia);
      const dCalorias =  this.giveMeValue(ingrediente.calorias);
      const dFoto =  this.giveMeValue(ingrediente.foto, 'nofoto.jpg');
      let newHTML = '';

      if (readonly)
      {
        newHTML = `
        <div class="container p-3 my-3 border text-justify">
        <div class="Row"><b>Nombre:</b> ${dNombre}      </div>
        <br>
        <div class="Row"><b>Descripción:</b> ${dDescripcion}  </div>
        <br>
        <div class="Row"><b>Familia:</b> ${dFamilia}  </div>
        <br>
        <div class="Row"><b>Calorias:</b> ${dCalorias}  </div>
        <br>
        <div class="Row"><b>Fotografía:</b> <img height="50px" src="/assets/img/ingredientes/${dFoto.toLowerCase()}"/>
        </div>
      `;
      }
      else
      {
        newHTML = `
          <input id="nombre" value="${dNombre}"           class="swal2-input" placeholder="Nombre" required>
          <input id="descripcion" value="${dDescripcion}" class="swal2-input" placeholder="Descripcion">
          <input id="familia" value="${dFamilia}"         class="swal2-input" placeholder="Familia">
          <input id="calorias" value="${dCalorias}"       class="swal2-input" placeholder="Calorias">
          <input id="foto" value="${dFoto}"               class="swal2-input" placeholder="Foto">
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
        this.newIngrediente(await ingredienteFormBasicDialog('Añadir ingrediente', this.inicializeForm(datos))
        );
      }
      if (accion === 'info') {
        this.editIngrediente(await ingredienteFormBasicDialog('Detalle del ingrediente', this.inicializeForm(datos, true), 1000)
        );
      }
      if (accion === 'edit') {
        this.editIngrediente(await ingredienteFormBasicDialog('Editar ingrediente', this.inicializeForm(datos))
        );
      }
    } catch (error) {
      basicAlert(TYPE_ALERT.ERROR, error);
    }
  }

  newIngrediente(result: any) {
    if (result.value) {
      console.log('* AÑADIR ====================================================');
      console.log(result);

      this.service.addIngrediente(result.value).subscribe((res: any) => {
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

  editIngrediente(result: any) {
    console.log('* EDITAR ====================================================');
    console.log(result.value);

    console.log(result);
  }




}
