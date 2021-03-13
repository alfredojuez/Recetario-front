import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { RecetaPreviewModule } from '@shared/receta-preview/receta-preview.module';
import { ListadoCategoriasModule } from '@core/components/listado-categorias/listado-categorias.module';
import { ListadoRecetasModule } from '@core/components/listado-recetas/listado-recetas.module';


@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    InicioRoutingModule,
    ListadoRecetasModule
  ]
})
export class InicioModule { }
