import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { LISTA_INGREDIENTES_QUERY } from '@graphql/operations/query/ingrediente';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { confirmDetailBasic, infoDetailBasic, ingredienteFormBasicDialog } from '@shared/alerts/alerts';
import { IngredientesService } from './ingredientes.service';
import { topRightAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { giveMeValue } from '@shared/functions/data-functions';

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

  /**
   * Formulario solo lectura con la información del ingrediente
   * @param ingrediente  Datos a mostrar en el formulario
   */
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

  /**
   * Inicializamos el codigo de formulario para los ingredientes
   * @param ingrediente       Objeto de BD con la información a mostrar
   */
 private inicializeForm(ingrediente: any)
  {
      return `
        <input type="text" id="nombre" value="${giveMeValue(ingrediente.nombre)}"             class="mb-1 swal2-input" placeholder="Nombre" required>
        <input type="text" id="descripcion" value="${giveMeValue(ingrediente.descripcion)}"   class="mb-1 swal2-input" placeholder="Descripcion">
        <input type="text" id="familia" value="${giveMeValue(ingrediente.familia)}"           class="mb-1 swal2-input" placeholder="Familia">
        <input type="text" id="calorias" value="${giveMeValue(ingrediente.calorias)}"         class="mb-1 swal2-input" placeholder="Calorias">
        <input type="text" id="foto" value="${giveMeValue(ingrediente.foto, 'no-photo.png')}" class="mb-1 swal2-input" placeholder="Foto">
      `;
  }

  /**
   * Generamos el codigo del título con el icono del ingrediente
   * @param texto   Nombre de la acción que estemos haciendo
   */
  private getTitulo(texto: string)
  {
    return `<div>${ texto } - <i class="fas fa-carrot"></i> </div>`;
  }

  /**
   * Cada uno de los botones de la tabla lanzará una acción, aquí las recogemos todas y las procesamos
   * @param $event  Objeto con la tupla acción y datos del registro.
   */
  async takeAction($event: any) {
    const accion = $event.accion;
    const datos = $event.datos;

    switch (accion) {
      case 'info':
        infoDetailBasic(this.getTitulo('Detalle del ingrediente'), this.infoForm(datos)
        );
        break;
      case 'add':
        this.addIngrediente(
          await ingredienteFormBasicDialog('Añadir ingrediente', this.inicializeForm(datos)
          )
        );
        break;
      case 'edit':
        this.updateIngrediente(datos.idIngrediente,
          await ingredienteFormBasicDialog('Editar ingrediente', this.inicializeForm(datos)
          )
        );
        break;
      case 'del':
        this.deleteIngrediente(datos.idIngrediente,
          await confirmDetailBasic(this.getTitulo('Eliminación de ingrediente'), this.infoForm(datos)
          )
        );
        break;
    }
}
  /**
   * Añadimos una nueva categoría
   * @param result  Respuesta dada en el modal de solicitud de datos.
   */
  addIngrediente(result: any) {
    if (result.isConfirmed && result.value) {
        // llamamos al sercicio de creacion del registro
        this.service.add(result.value).subscribe((res: any) =>
        {
          (res.status)
            ? topRightAlert(TYPE_ALERT.SUCCESS, res.message)
            : topRightAlert(TYPE_ALERT.WARNING, res.message);
        });
    } else {
      topRightAlert(TYPE_ALERT.INFO, 'Operación cancelada');
    }
  }

  /**
   * Actualizamos los datos de la ficha seleccionada
   * @param id      ID del registro a actualizar
   * @param result  Datos obtenidos del formulario de edición
   */
  updateIngrediente(id: number, result: any) {
    if (result.isConfirmed && result.value) {
      this.service.update(id, result.value).subscribe((res: any) => {
        (res.status)
        ? topRightAlert(TYPE_ALERT.SUCCESS, res.message)
        : topRightAlert(TYPE_ALERT.WARNING, res.message);
      });
    } else {
      topRightAlert(TYPE_ALERT.INFO, 'Operación cancelada');
    }
  }

  /**
   * Eliminamos un registro de la BD si se puede
   * @param id      ID del registro a eliminar
   * @param result  Resultado del modal para la confirmación de la eliminación
   */
  deleteIngrediente(id: number, result: boolean) {
    if (result) {
      this.service.delete(id).subscribe((res: any) => {
        (res.status)
        ? topRightAlert(TYPE_ALERT.SUCCESS, res.message)
        : topRightAlert(TYPE_ALERT.WARNING, res.message);
      });
    } else {
      topRightAlert(TYPE_ALERT.INFO, 'Operación cancelada');
    }
  }

}
