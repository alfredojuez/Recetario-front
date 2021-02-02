import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { UsersService } from '@core/services/users.service';
import { ApiService } from 'src/app/@graphql/services/api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  // private auth: AuthService ->  para hacer uso del API.LOGIN
  constructor(private usersApi: UsersService, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.login('alfredojuez',
                   'alfredojuez').subscribe(result => {
      console.log(result);
    });

    this.usersApi.getUsuarios().subscribe(result => {
          console.log(result);
      });

    this.auth.getMe().subscribe(result => {
      console.log(result);
  });
  }

}
