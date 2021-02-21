import { Component, OnInit } from '@angular/core';
import { EMAIL_PATTERN } from '@core/constant/regex';
import { UsersService } from '@core/services/users.service';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  emailPattern = EMAIL_PATTERN;
  emailValue: string;

  constructor( private usersService: UsersService) { }

  ngOnInit(): void {
  }

  reset()
  {
      console.log('Reseteando contraseña');
      console.log(this.emailValue);
      this.usersService.resetPassMail(this.emailValue).subscribe(
        result => {
          basicAlert((result.status) ? TYPE_ALERT.SUCCESS : TYPE_ALERT.ERROR, 'Reseteo de contraseña', result.message);
        }
      )
  }

}
