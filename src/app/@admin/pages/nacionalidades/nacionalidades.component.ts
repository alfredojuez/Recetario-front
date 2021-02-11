import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { LISTA_NACIONALIDADES_QUERY } from '@graphql/operations/query/nacionalidad';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { confirmDetailBasic, infoDetailBasic, nacionalidadFormBasicDialog } from '@shared/alerts/alerts';
import { NacionalidadesService } from './nacionalidades.service';
import { topRightAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { giveMeValue } from '@shared/functions/data-functions';

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
    this.bloqueable = false;  // indica si queremos el boton de bloqueo

    // this.include = false;
    this.columns = [
      { property: 'icono', label: 'Icono', typeElement: 'IMG'},
      { property: 'idNacionalidad', label: 'Código', typeElement: 'TEXT'},
      { property: 'nombre', label: 'Nombre', typeElement: 'TEXT'},
    ];
  }


  /**
   * Formulario solo lectura con la información del ingrediente
   * @param ingrediente  Datos a mostrar en el formulario
   */
  private infoForm(nacionalidad: any)
  {
    return `
            <div class="container p-3 my-3 border text-justify">
              <div class="Row"><b>Nombre:</b> ${giveMeValue(nacionalidad.nombre)}  </div>          <br>
              <div class="Row"><b>COD:</b> ${giveMeValue(nacionalidad.idNacionalidad)}     </div>          <br>
              <div class="Row"><b>Escudo:</b> ${giveMeValue(nacionalidad.icono, 'no-photo.png')}    </div>          <br>
              <div class="Row"><b>Escudo:</b> <img height="50px" src="/assets/img/banderas/${giveMeValue(nacionalidad.icono, 'no-photo.png').toLowerCase()}"/>
              </div>
            </div>
          `;
  }

  /**
   * Inicializamos el codigo de formulario para los ingredientes
   * @param ingrediente       Objeto de BD con la información a mostrar
   */
 private inicializeForm(nacionalidad: any)
  {
      return `
              <input id="idNacionalidad" value="${giveMeValue(nacionalidad.idNacionalidad)}"  class="mb-1 swal2-input" placeholder="Codigo" required>
              <input id="nombre" value="${giveMeValue(nacionalidad.nombre)}"                  class="mb-1 swal2-input" placeholder="Nombre" required>
              <input id="icono" value="${giveMeValue(nacionalidad.icono, 'no-photo.png')}"    class="mb-1 swal2-input" placeholder="Familia" required>
            `;
  }

  /**
   * Generamos el codigo del título con el icono del ingrediente
   * @param texto   Nombre de la acción que estemos haciendo
   */
  private getTitulo(texto: string)
  {
    return `<div>${ texto } - <i class="fas fa-flag-checkered"></i> </div>`;
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
        infoDetailBasic(this.getTitulo('Detalle de la nacionalidad'), this.infoForm(datos)
        );
        break;
      case 'add':
        this.addNacionalidad(
          await nacionalidadFormBasicDialog('Añadir nacionalidad', this.inicializeForm(datos)
          )
        );
        break;
      case 'edit':
        this.updateNacionalidad(datos.idNacionalidad,
          await nacionalidadFormBasicDialog('Editar nacionalidad', this.inicializeForm(datos)
          )
        );
        break;
      case 'del':
        this.deleteNacionalidad(datos.idNacionalidad,
          await confirmDetailBasic(this.getTitulo('Eliminación de nacionalidad'), this.infoForm(datos)
          )
        );
        break;
    }
}
  /**
   * Añadimos una nueva categoría
   * @param result  Respuesta dada en el modal de solicitud de datos.
   */
  addNacionalidad(result: any) {
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
  updateNacionalidad(id: string, result: any) {
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
  deleteNacionalidad(id: string, result: boolean) {
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
