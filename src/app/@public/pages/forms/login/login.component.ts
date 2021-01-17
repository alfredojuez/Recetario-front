import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { ILoginForm, IResultLogin } from '@core/interfaces/login.interface';
import { basicAlert, topRightAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  login: ILoginForm = {
    email: '',
    pass: ''
  };

  constructor(private auth: AuthService,  private router: Router) { }

  init(){
    console.log('NO PARECE QUE ESTE HACIENDO EL INIT.....');
    console.log(this.login);
    this.auth.login(this.login.email, this.login.pass).subscribe(
      (result: IResultLogin) => {
      if (result.status && result.token)
      {
        console.log('TOKEN: ');
        console.log(result.token);
        this.auth.setSession(result.token, 8);            // guardamos la sesión durante 8 horas
        this.auth.updateSesion(result);
        basicAlert(TYPE_ALERT.SUCCESS, 'Acceso concedido', result.message) ;  // informacion de login correcto.
        this.router.navigate(['/']);
      }
      else
      {
         basicAlert(TYPE_ALERT.ERROR, 'Acceso denegado', result.message);    // login incorrecto.
      }
    });
  }
}
