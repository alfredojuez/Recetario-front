import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NacionalidadesRoutingModule } from './nacionalidades-routing.module';
import { NacionalidadesComponent } from './nacionalidades.component';


@NgModule({
  declarations: [NacionalidadesComponent],
  imports: [
    CommonModule,
    NacionalidadesRoutingModule
  ]
})
export class NacionalidadesModule { }
