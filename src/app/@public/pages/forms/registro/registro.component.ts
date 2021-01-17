import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRegisterForm, IResultRegister } from '@core/interfaces/register.interface';
import { UsersService } from '@core/services/users.service';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  register: IRegisterForm = {
    nombre: '',
    apellidos: '',
    email: '',
    usuario: '',
    pass: '',
    perfil: 'USER',
    nacionalidad: '',
    fecha_nacimiento: '',
  };

  constructor(private api: UsersService, private router: Router) {}

  ngOnInit(): void {
      const data = new Date();
      data.setFullYear(data.getFullYear() - 18);
      this.register.fecha_nacimiento = (data.toISOString()).substring(0, 10);
      console.log(this.register);
  }

  private formatNumbers(num: number | string = 1 , lon: number = 2)
  {
      // formateamos un número con tantos ceros como queramos por la izquierda.
      console.log('munero a formatear ', num);
      return num.toString().padStart(lon, '0');
  }

  dataAsign($event) {
    console.log('Cogiendo datos: ', $event);
    this.register.fecha_nacimiento = `${$event.year}-${this.formatNumbers($event.month)}-${this.formatNumbers($event.day)}`;
  }

  add() {
    console.log('enviando datos...');
    console.log(this.register);
    this.api.register(this.register).subscribe((result: IResultRegister) => {
    basicAlert((result.status) ? TYPE_ALERT.SUCCESS : TYPE_ALERT.ERROR, 'Creación de usuario', result.message);

    if (result.status)
    {
        this.router.navigate(['/login']);
    }

    });
  }
}
