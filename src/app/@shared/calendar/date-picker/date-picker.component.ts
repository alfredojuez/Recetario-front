import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  HOY = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day:  new Date().getDate()
  };

  // así limitamos las fechas entre hace 120 años y hoy
  minDate: NgbDateStruct = {
    year: new Date().getFullYear() - 120,
    month: new Date().getMonth() + 1,
    day:  new Date().getDate()
  };
  maxDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day:  new Date().getDate()
  };

  // seleccionamos como fecha de nacimiento los 18 años
  model: NgbDateStruct = this.HOY;
  @Output() newDate = new EventEmitter<NgbDateStruct>();

  constructor() { }

  ngOnInit(): void {
  }

  selectDateChange()
  {
    console.log(this.model);
    this.newDate.emit(this.model);
  }
}
