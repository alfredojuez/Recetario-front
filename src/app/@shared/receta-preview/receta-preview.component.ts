import { TituloComponent } from '@admin/core/components/titulo/titulo.component';
import { Component, Input, OnInit } from '@angular/core';
import { IReceta } from '@core/interfaces/recetas.interface';

@Component({
  selector: 'app-receta-preview',
  templateUrl: './receta-preview.component.html',
  styleUrls: ['./receta-preview.component.scss']
})
export class RecetaPreviewComponent implements OnInit {

  @Input() titulo = 'título de la categoria';
  @Input() receta: IReceta;

  constructor() { }

  ngOnInit(): void {
    console.log('Mi receta= ', this.receta);
  }

  ver(receta: any)
  {
    console.log('Ver receta');
  }
  sendMail(receta: any)
  {
    console.log('Enviar por mail');
  }

  copyLink(receta: any)
  {
    console.log('Copiar link');
  }


  AddtoCart(receta: any)
  {
      console.log('Añadir al menú del día');
  }


  favorite(receta: any)
  {
    console.log('Añadir a favoritos');
  }

}
