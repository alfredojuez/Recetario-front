import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NacionalidadesRoutingModule } from './nacionalidades-routing.module';
import { NacionalidadesComponent } from './nacionalidades.component';
import { TablePaginationModule } from '@shared/table-pagination/table-pagination.module';


@NgModule({
  declarations: [NacionalidadesComponent],
  imports: [
    CommonModule,
    NacionalidadesRoutingModule,
    TablePaginationModule,
  ]
})
export class NacionalidadesModule { }
