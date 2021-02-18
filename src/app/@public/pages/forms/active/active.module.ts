import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActiveRoutingModule } from './active-routing.module';
import { ActiveComponent } from './active.component';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from '@shared/calendar/date-picker/date-picker.module';


@NgModule({
  declarations: [ActiveComponent],
  imports: [
    CommonModule,
    ActiveRoutingModule,
    FormsModule,
    DatePickerModule
  ]
})
export class ActiveModule { }
