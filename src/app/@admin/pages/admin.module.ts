import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CabeceraComponent } from '@admin-core/components/cabecera/cabecera.component';
import { TituloComponent } from '@admin-core/components/titulo/titulo.component';
import { BarralateralComponent } from '@admin-core/components/barralateral/barralateral.component';
import { CategoriasComponent } from './categorias/categorias.component';


@NgModule({
  declarations: [AdminComponent, CabeceraComponent, TituloComponent, BarralateralComponent, CategoriasComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
