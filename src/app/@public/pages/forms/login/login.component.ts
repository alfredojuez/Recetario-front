import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { ILoginForm, IResultLogin } from '@public/core/interfaces/login.interface';

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
  }

  init(){
    this.auth.login(this.login.email, this.login.pass).subscribe(
      (result: IResultLogin) => {
      console.log(result);
      if (result.status && result.token !== null)
      {
        console.log('inicio de sesion correcto');
      }
      else
      {
        console.log('inicio de sesion no válido');
      }
    });
  }

}
