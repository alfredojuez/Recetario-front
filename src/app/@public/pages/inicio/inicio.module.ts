import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { RecetaPreviewComponent } from '@shared/receta-preview/receta-preview.component';
import { RecetaPreviewModule } from '@shared/receta-preview/receta-preview.module';


@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    InicioRoutingModule,
    RecetaPreviewModule
  ]
})
export class InicioModule { }
