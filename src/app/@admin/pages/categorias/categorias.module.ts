import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { TablePaginationModule } from '@shared/table-pagination/table-pagination.module';
import { CategoriasComponent } from './categorias.component';


@NgModule({
  declarations: [CategoriasComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    TablePaginationModule,
  ]
})
export class CategoriasModule { }
