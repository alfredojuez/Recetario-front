import { Component, Input, OnInit } from '@angular/core';
import { IReceta } from '@core/interfaces/recetas.interface';

@Component({
  selector: 'app-listado-recetas',
  templateUrl: './listado-recetas.component.html',
  styleUrls: ['./listado-recetas.component.scss']
})
export class ListadoRecetasComponent implements OnInit {

  @Input() titulo = 'Título de la categoría';
  @Input() esTop = true;
  @Input() ListaRecetas: Array<IReceta>= [];

  constructor() { }

  ngOnInit(): void {
  }

  gotoItem($event) {
    console.log("LR MAIN GOTO")
    console.log($event);
  }

  addToCart($event) {
    console.log("LR MAIN CART")
    console.log($event);
  }

  addToFavorite($event) {
    console.log("LR MAIN FAV")
    console.log($event);
  }
 

}
