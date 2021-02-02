import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientesRoutingModule } from './ingredientes-routing.module';
import { IngredientesComponent } from './ingredientes.component';
import { TablePaginationModule } from '@shared/table-pagination/table-pagination.module';


@NgModule({
  declarations: [IngredientesComponent],
  imports: [
    CommonModule,
    IngredientesRoutingModule,
    TablePaginationModule,
  ]
})
export class IngredientesModule { }
