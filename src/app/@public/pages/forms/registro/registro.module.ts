import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { DatePickerModule } from '@shared/calendar/date-picker/date-picker.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [RegistroComponent],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    DatePickerModule,
    FormsModule,
  ]
})
export class RegistroModule { }
