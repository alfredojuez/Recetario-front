import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { LISTA_CATEGORIAS_QUERY } from '@graphql/operations/query/categoria';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { categoriaFormBasicDialog, formBasicDialog } from '@shared/alerts/alerts';
import { CategoriasService } from './categorias.service';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { exception } from 'console';
import { SweetAlertResult } from 'sweetalert2';

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
    this.itemsPage = 15;
    this.resultData = {
      definitionKey: 'ListadoCategorias',
      listKey: 'categorias',
    };
    this.bloqueable = false;

    // this.include = false;
    this.columns = [
      // { property: 'idCategoria', label: '#', typeElement: 'TEXT'},
      {
        property: 'nombre',
        label: 'Nombre de la categoría',
        typeElement: 'TEXT',
      },
      { property: 'descripcion', label: 'descripcion', typeElement: 'TEXT' },
      // { property: 'foto', label: 'foto', typeElement: 'IMG'},
    ];
  }

  private inicializeForm(categoria: any, readonly: boolean = false)
  {
      const dNombre = categoria.nombre !== undefined && categoria.nombre !== '' ? categoria.nombre : '';
      const desc = categoria.descripcion;
      const dDescripcion = desc !== undefined && desc !== null && desc !== '- No hay descripción disponible - ' ? desc : '';
      const dFoto = categoria.foto !== undefined && categoria.foto !== '' ? categoria.foto : 'nofoto.jpg';
      let newHTML = '';

      if (readonly)
      {
        newHTML = `
        <div class="container p-3 my-3 border text-justify">
        <div class="Row"><b>Nombre:</b> ${dNombre}      </div>
        <br>
        <div class="Row"><b>Descripción:</b> ${dDescripcion}  </div>
        <br>
        <div class="Row"><b>Fotografía:</b> <img height="50px" src="/assets/img/categorias/${dFoto.toLowerCase()}"/>
        </div>
      `;
      }
      else
      {
        newHTML = `
          <input id="nombre" value="${dNombre}" class="swal2-input" placeholder="Nombre" required>
          <input id="descripcion" value="${dDescripcion}" class="swal2-input" placeholder="Descripcion">
          <input id="foto" value="${dFoto}" class="swal2-input" placeholder="Foto">`;
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
        this.newCategoria(await categoriaFormBasicDialog('Añadir categoria', this.inicializeForm(datos))
        );
      }
      if (accion === 'info') {
        this.editCategoria(await categoriaFormBasicDialog('Detalle de la categoria', this.inicializeForm(datos, true), 1000)
        );
      }
      if (accion === 'edit') {
        this.editCategoria(await categoriaFormBasicDialog('Editar categoria', this.inicializeForm(datos))
        );
      }
    } catch (error) {
      basicAlert(TYPE_ALERT.ERROR, error);
    }
  }

  newCategoria(result: any) {
    if (result.value) {
      console.log('* AÑADIR ====================================================');
      console.log(result);

      this.service.addCategoria(result.value).subscribe((res: any) => {
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

  editCategoria(result: any) {
    console.log('* EDITAR ====================================================');
    console.log(result.value);

    console.log(result);
  }
}
