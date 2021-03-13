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
export class InicioComponent implements OnInit 
{
  // private auth: AuthService ->  para hacer uso del API.LOGIN
  constructor(private usersApi: UsersService, private auth: AuthService) { }
  // constructor(private auth: AuthService) { }
  ListadoGeneral: any;
  ListadoTOP: any;

  ngOnInit(): void
  {
    this.ListadoGeneral = ListaJSONRecetas;
    this.ListadoTOP = this.fakeRandomRecipes();
  }
 
  gotoItem($event) {
    console.log("ini MAIN GOTO")
    console.log($event);
  }

  addToCart($event) {
    console.log("ini MAIN CART")
    console.log($event);
  }

  addToFavorite($event) {
    console.log("ini MAIN FAV")
    console.log($event);
  } 

  fakeRandomRecipes()
  {
    const list = [];
    const max = 3;
    const limit = this.ListadoGeneral.length;
    console.log("aleatoria")
    for(let i=0;i<max;)
    {
      let aleatoria = this.ListadoGeneral[Math.floor(Math.random( ) * limit)];
      if(!list.find(element => element == aleatoria))
      {
            list.push(aleatoria)
            i++;
      }
    }
    return list;
  }

}
