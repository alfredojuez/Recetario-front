import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit
{
  token: string;
  values: any =
  {
    pass: '',
    pass2: '',
    fecha_nacimiento: ''
  };

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      //  console.log(params);
      this.token = params.token;
      console.log(this.token);
    });
  }

  ngOnInit(): void {
    const data = new Date();
    data.setFullYear(data.getFullYear() - 18);
    this.values.fecha_nacimiento = (data.toISOString()).substring(0, 10);
    console.log(this.values)  ;
  }

  private formatNumbers(num: number | string = 1 , lon: number = 2)
  {
      // formateamos un número con tantos ceros como queramos por la izquierda.
      console.log('munero a formatear ', num);
      return num.toString().padStart(lon, '0');
  }

  dataAsign($event) {
    console.log('Cogiendo datos: ', $event);
    this.values.fecha_nacimiento = `${$event.year}-${this.formatNumbers($event.month)}-${this.formatNumbers($event.day)}`;
  }

  add()
  {

  }

}
