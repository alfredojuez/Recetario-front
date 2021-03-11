import { Component, OnInit } from '@angular/core';
import { IReceta } from '@core/interfaces/recetas.interface';
import { AuthService } from '@core/services/auth.service';
import { UsersService } from '@core/services/users.service';
import ListaJSONRecetas from '@datos/recetas.json';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  productList;
  // private auth: AuthService ->  para hacer uso del API.LOGIN
  constructor(private usersApi: UsersService, private auth: AuthService) { }
  // constructor(private auth: AuthService) { }
  ListaRecetas: any;

  ngOnInit(): void
  {
    this.ListaRecetas = ListaJSONRecetas;
    console.log('ListaJSONRecetas: ', ListaJSONRecetas);
  }

}
