import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoRecetasComponent } from './listado-recetas.component';
import { RecetaPreviewModule } from '@shared/receta-preview/receta-preview.module';



@NgModule({
  declarations: [ListadoRecetasComponent],
  imports: [
    CommonModule,
    RecetaPreviewModule,
  ],
 exports: [ListadoRecetasComponent],
})
export class ListadoRecetasModule { }
