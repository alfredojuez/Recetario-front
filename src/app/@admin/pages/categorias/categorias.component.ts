import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { LISTA_CATEGORIAS_QUERY } from '@graphql/operations/query/categoria';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { giveMeValue } from '@shared/functions/data-functions';
import {
  categoriaFormBasicDialog,
  confirmDetailBasic,
  infoDetailBasic,
} from '@shared/alerts/alerts';
import { CategoriasService } from './categorias.service';
import { topRightAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {
  private refreshData = new Subject<boolean>();
  public refreshData$ = this.refreshData.asObservable();
  query: DocumentNode = LISTA_CATEGORIAS_QUERY;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  // include: boolean;
  columns: Array<ITableColumns>;
  bloqueable: boolean;

  constructor(private service: CategoriasService) {}

  ngOnInit(): void
  {
    this.context = {};
    this.itemsPage = 10;
    this.resultData = {
      definitionKey: 'ListadoCategorias',
      listKey: 'categorias',
    };
    this.bloqueable = false;
    // this.include = false;
    this.columns = [
      { property: 'nombre', label: 'Nombre', typeElement: 'TEXT' },
      { property: 'descripcion', label: 'Descripción', typeElement: 'TEXT' },
    ];
  }

  /**
   * Formulario solo lectura con la información de la categoria
   * @param categoria  Datos a mostrar en el formulario
   */
  private infoForm(categoria: any) {
    return `
            <div class="container p-3 my-3 border text-justify">
            <div class="Row"><b>#: </b> ${categoria.idCategoria}                        </div><br>
            <div class="Row"><b>Nombre:</b> ${giveMeValue(categoria.nombre)}            </div><br>
            <div class="Row"><b>Descripción:</b> ${giveMeValue(categoria.descripcion)}  </div><br>
            <div class="Row"><b>Fotografía:</b> 
                <img height="250px" src="/assets/img/categorias/${giveMeValue(categoria.foto, 'no-photo.png').toLowerCase()}"/>
            </div>
          `;
  }

  /**
   * Inicializamos el codigo de formulario para las categorias
   * @param categoria       Objeto de BD con la información a mostrar
   */
  private inicializeForm(categoria: any) {
    return `<input id="nombre" value="${giveMeValue(categoria.nombre)}"               class="mb-1 swal2-input" placeholder="Nombre" required>
              <input id="descripcion" value="${giveMeValue(categoria.descripcion)}"   class="mb-1 swal2-input" placeholder="Descripcion">
              <input id="foto" value="${giveMeValue(categoria.foto, 'no-photo.png')}" class="mb-1 swal2-input" placeholder="Foto">`;
  }

  /**
   * Generamos el codigo del título con el icono de la categoria
   * @param texto   Nombre de la acción que estemos haciendo
   */
  private getTitulo(texto: string) {
    return `<div>${texto} - <i class="fas fa-sitemap"></i> </div>`;
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
          infoDetailBasic(this.getTitulo('Detalle de la categoria'), this.infoForm(datos)
          );
          break;
        case 'add':
          this.addCategoria(
            await categoriaFormBasicDialog('Añadir categoria', this.inicializeForm(datos)
            )
          );
          break;
        case 'edit':
          this.updateCategoria(datos.idCategoria,
            await categoriaFormBasicDialog('Editar categoria', this.inicializeForm(datos)
            )
          );
          break;
        case 'del':
          this.deleteCategoria(datos.idCategoria,
            await confirmDetailBasic(this.getTitulo('Eliminación de categoria'), this.infoForm(datos)
            )
          );
          break;
      }
  }

  /**
   * Añadimos una nueva categoría
   * @param result  Respuesta dada en el modal de solicitud de datos.
   */
  addCategoria(result: any) {
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
    this.refreshData.next(true);
  }

  /**
   * Actualizamos los datos de la ficha seleccionada
   * @param id      ID del registro a actualizar
   * @param result  Datos obtenidos del formulario de edición
   */
  updateCategoria(id: number, result: any) {
    if (result.isConfirmed && result.value) {
      this.service.update(id, result.value).subscribe((res: any) => {
        (res.status)
        ? topRightAlert(TYPE_ALERT.SUCCESS, res.message)
        : topRightAlert(TYPE_ALERT.WARNING, res.message);
      });
    } else {
      topRightAlert(TYPE_ALERT.INFO, 'Operación cancelada');
    }
    this.refreshData.next(true);

  }

  /**
   * Eliminamos un registro de la BD si se puede
   * @param id      ID del registro a eliminar
   * @param result  Resultado del modal para la confirmación de la eliminación
   */
  deleteCategoria(id: number, result: boolean) {
    if (result) {
      this.service.delete(id).subscribe((res: any) => {
        (res.status)
        ? topRightAlert(TYPE_ALERT.SUCCESS, res.message)
        : topRightAlert(TYPE_ALERT.WARNING, res.message);
      });
    } else {
      topRightAlert(TYPE_ALERT.INFO, 'Operación cancelada');
    }
    this.refreshData.next(true);
  }



}
