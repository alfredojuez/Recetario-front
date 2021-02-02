import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { CabeceraComponent } from '@public-core/components/cabecera/cabecera.component';
import { BarralateralComponent } from '@public-core/components/barralateral/barralateral.component';
import { PiepaginaComponent } from '@public-core/components/piepagina/piepagina.component';


@NgModule({
  declarations: [PublicComponent, CabeceraComponent, BarralateralComponent, PiepaginaComponent],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
