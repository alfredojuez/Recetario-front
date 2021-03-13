import { Component, Input, OnInit } from '@angular/core';
import { ICategoria } from '@core/interfaces/categorias.interface';

@Component({
  selector: 'app-listado-categorias',
  templateUrl: './listado-categorias.component.html',
  styleUrls: ['./listado-categorias.component.scss']
})
export class ListadoCategoriasComponent implements OnInit {

  @Input() titulo = 'Título de la categoría';
  @Input() categoryList: Array<ICategoria>= [];

  constructor() { }

  ngOnInit(): void {
  }
}
