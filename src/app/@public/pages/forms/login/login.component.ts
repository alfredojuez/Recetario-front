import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { ILoginForm, IResultLogin } from '@core/interfaces/login.interface';
import { basicAlert, topRightAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { IMeData } from '@core/interfaces/session.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: ILoginForm = {
    email: '',
    pass: ''
  };

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
      this.auth.start();
  }

  init(){
    this.auth.login(this.login.email, this.login.pass).subscribe(
      (result: IResultLogin) => {
      if (result.status && result.token)
      {
        console.log('TOKEN: ');
        console.log(result.token);
        this.auth.setSession(result.token, 8);            // guardamos la sesión durante 8 horas
        basicAlert(TYPE_ALERT.SUCCESS, result.message) ;  // informacion de login correcto.
      }
      else
      {
         basicAlert(TYPE_ALERT.ERROR, result.message);    // login incorrecto.
      }
    });
  }

}
