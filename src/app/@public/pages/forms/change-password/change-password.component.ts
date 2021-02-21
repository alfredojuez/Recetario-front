import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@core/services/users.service';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  token: string;
  idUsuario: number;

  values: any =
  {
    pass: '',
    pass2: '',
  };

  constructor(
    private URLroute: ActivatedRoute,
    private userService: UsersService,
    private router: Router
  ) {
    this.URLroute.params.subscribe((params) => {
      this.token = params.token;
      console.log(this.token)
    });
  }

  ngOnInit(): void {}

  viewInfoToken(token: string)
  {
    return JSON.parse(atob(token.split('.')[1])).usuario;
  }

  change()
  {
    console.log('cambiando contraseña');
    this.userService.changePass(this.token, this.values.pass).subscribe(
      result => {
        if (result.status)
        {
          basicAlert(TYPE_ALERT.SUCCESS, 'Contraseña actualizada', result.message); // informacion de login correcto.
          this.router.navigate(['/login']);
        } else {
          basicAlert(TYPE_ALERT.ERROR, 'Acceso denegado', result.message); // login incorrecto.
        }
      }
    );
  }
}
