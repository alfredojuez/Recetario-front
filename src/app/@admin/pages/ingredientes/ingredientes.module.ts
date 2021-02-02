import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientesRoutingModule } from './ingredientes-routing.module';
import { IngredientesComponent } from './ingredientes.component';


@NgModule({
  declarations: [IngredientesComponent],
  imports: [
    CommonModule,
    IngredientesRoutingModule
  ]
})
export class IngredientesModule { }
