import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { LISTA_CATEGORIAS_QUERY } from '@graphql/operations/query/categoria';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { categoriaFormBasicDialog, infoDetailBasic } from '@shared/alerts/alerts';
import { CategoriasService } from './categorias.service';
import { topRightAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {
  query: DocumentNode = LISTA_CATEGORIAS_QUERY;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  // include: boolean;
  columns: Array<ITableColumns>;
  bloqueable: boolean;

  constructor(private service: CategoriasService) {}

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 10;
    this.resultData = {
      definitionKey: 'ListadoCategorias',
      listKey: 'categorias',
    };
    this.bloqueable = false;
    // this.include = false;
    this.columns = [
      { property: 'nombre', label: 'Nombre', typeElement: 'TEXT'},
      { property: 'descripcion', label: 'Descripción', typeElement: 'TEXT'},
    ];
  }

  giveMeValue(campo: any, porDefecto: string = '')
  {
    return (campo !== undefined && campo !== null && campo !== '') ? campo : porDefecto;
  }

  private infoForm(categoria: any)
  {
    return `
            <div class="container p-3 my-3 border text-justify">
            <div class="Row"><b>#: </b> ${categoria.idCategoria}      </div>
            <br>
            <div class="Row"><b>Nombre:</b> ${this.giveMeValue(categoria.nombre)}      </div>
            <br>
            <div class="Row"><b>Descripción:</b> ${this.giveMeValue(categoria.descripcion)}  </div>
            <br>
            <div class="Row"><b>Fotografía:</b> <img height="250px" src="/assets/img/categorias/${this.giveMeValue(categoria.foto, 'no-photo.png').toLowerCase()}"/>
            </div>
          `;
  }

  private inicializeForm(categoria: any)
  {
      console.log('inicializado de categorias');
      return `<input id="nombre" value="${this.giveMeValue(categoria.nombre)}"              class="mb-1 swal2-input" placeholder="Nombre" required>
              <input id="descripcion" value="${this.giveMeValue(categoria.descripcion)}"    class="mb-1 swal2-input" placeholder="Descripcion">
              <input id="foto" value="${this.giveMeValue(categoria.foto, 'no-photo.png')}"  class="mb-1 swal2-input" placeholder="Foto">`;
  }

  private getTitulo(texto: string)
  {
    return `<div>${ texto } - <i class="fas fa-sitemap"></i> </div>`;
  }

  async takeAction($event) {
    try {
      const accion = $event.accion;
      const datos = $event.datos;
      console.log(accion);
      console.log(datos);

      if (accion === 'info') {
        infoDetailBasic(this.getTitulo('Detalle de la categoria'),
                        this.infoForm(datos));
        return;
      }
      if (accion === 'add') {
        this.addCategoria(await categoriaFormBasicDialog('Añadir categoria', this.inicializeForm(datos)));
      }
      if (accion === 'edit') {
        this.updateCategoria(datos.idCategoria, await categoriaFormBasicDialog('Editar categoria', this.inicializeForm(datos)));
        return;
      }
      if (accion === 'del') {
        // TODO: antes de eliminar una categoria hay que verificar que no esté asociada a ninguna receta.
        infoDetailBasic(this.getTitulo('Eliminación de categoria'), '');
        return;
      }
    } catch (error) {
      topRightAlert(TYPE_ALERT.ERROR, error, 'center');
    }
  }

  viewCategoria(result: any) {
    console.log('* VER INFO  ====================================================');
    console.log(result.value);
    console.log(result);
  }

  addCategoria(result: any)
  {
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
      console.log('operacion cancelada');
    }

  }

  updateCategoria(id: number, result: any) {
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
