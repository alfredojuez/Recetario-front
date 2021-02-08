import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { LISTA_INGREDIENTES_QUERY } from '@graphql/operations/query/ingrediente';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { infoDetailBasic, ingredienteFormBasicDialog } from '@shared/alerts/alerts';
import { IngredientesService } from './ingredientes.service';
import { basicAlert, topRightAlert } from '@shared/alerts/toasts';
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

  constructor(private service: IngredientesService) {  }

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
      { property: 'nombre', label: 'Nombre', typeElement: 'TEXT'},
      { property: 'calorias', label: 'Calorias', typeElement: 'TEXT'},
      { property: 'descripcion', label: 'Descripción', typeElement: 'TEXT'},
    ];
  }

  giveMeValue(campo: any, porDefecto: string = '')
  {
    return (campo !== undefined && campo !== null && campo !== '') ? campo : porDefecto;
  }

  private infoForm(ingrediente: any)
  {
    return `
          <div class="container p-3 my-3 border text-justify">
          <div class="Row"><b>Nombre:</b> ${ingrediente.nombre}      </div>
          <br>
          <div class="Row"><b>Descripción:</b> ${ingrediente.descripcion}  </div>
          <br>
          <div class="Row"><b>Familia:</b> ${ingrediente.familia}  </div>
          <br>
          <div class="Row"><b>Calorias:</b> ${ingrediente.calorias}  </div>
          <br>
          <div class="Row"><b>Fotografía:</b> <img height="250px" src="/assets/img/ingredientes/${ingrediente.foto.toLowerCase()}"/>
          </div>
        `;
  }

  private inicializeForm(ingrediente: any)
  {
      const dNombre =       this.giveMeValue(ingrediente.nombre);
      const dDescripcion =  this.giveMeValue(ingrediente.descripcion);
      const dFamilia =      this.giveMeValue(ingrediente.familia);
      const dCalorias =     this.giveMeValue(ingrediente.calorias);
      const dFoto =         this.giveMeValue(ingrediente.foto, 'no-photo.png');

      const newHTML = `
        <input type="text" id="nombre" value="${dNombre}"           class="mb-1 swal2-input" placeholder="Nombre" required>
        <input type="text" id="descripcion" value="${dDescripcion}" class="mb-1 swal2-input" placeholder="Descripcion">
        <input type="text" id="familia" value="${dFamilia}"         class="mb-1 swal2-input" placeholder="Familia">
        <input type="text" id="calorias" value="${dCalorias}"       class="mb-1 swal2-input" placeholder="Calorias">
        <input type="text" id="foto" value="${dFoto}"               class="mb-1 swal2-input" placeholder="Foto">
      `;

      return newHTML;
  }

  private getTitulo(texto: string)
  {
    return `<div>${ texto } - <i class="fas fa-carrot"></i> </div>`;
  }

  async takeAction($event) {
    try {
      const accion = $event.accion;
      const datos = $event.datos;
      console.log(accion);
      console.log(datos);

      if (accion === 'info') {
        infoDetailBasic(this.getTitulo('Detalle de la ingrediente'),
                        this.infoForm(datos));
        return;
      }
      if (accion === 'add') {
        this.addIngrediente(await ingredienteFormBasicDialog('Añadir ingrediente', this.inicializeForm(datos)));
      }
      if (accion === 'edit') {
        this.updateIngrediente(datos.idIngrediente, await ingredienteFormBasicDialog('Editar ingrediente', this.inicializeForm(datos)));
        return;
      }
      if (accion === 'del') {
        // TODO: antes de eliminar una ingrediente hay que verificar que no esté asociada a ninguna receta.
        infoDetailBasic(this.getTitulo('Eliminación de ingrediente'), '');
        return;
      }
    } catch (error) {
      topRightAlert(TYPE_ALERT.ERROR, error, 'center');
    }
  }

  viewIngrediente(result: any) {
    console.log('* VER INFO  ====================================================');
    console.log(result.value);
    console.log(result);
  }

  addIngrediente(result: any) {
    if (result.isConfirmed)
    {

        console.log('* AÑADIR ====================================================');
        console.log(result);
        console.log(result.value);

        if (result.value) {
          this.service.add(result.value).subscribe((res: any) => {
            console.log(res);

            if (res.status) {
              topRightAlert(TYPE_ALERT.SUCCESS, res.message);
              return;
            } else {
              console.log(res);
              topRightAlert(TYPE_ALERT.WARNING, res.message);
            }
          });
        } else {
          console.log('operacion cancelada');
        }


    }
    else{
      console.log('operacion cancelada')
    }
  }

  updateIngrediente(id: number, result: any) {
      console.log('* EDITAR ====================================================');
      console.log(id);
      console.log(result.value);
      console.log(result);


      if (result.value) {
        this.service.update(id, result.value).subscribe((res: any) => {
          if (res.status) {
            console.log(topRightAlert(TYPE_ALERT.SUCCESS, res.message));
          } else {
            topRightAlert(TYPE_ALERT.WARNING, res.message);
          }
        });
      } else {
        console.log('operacion cancelada');
      }
  }

}
