import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IReceta } from '@core/interfaces/recetas.interface';

@Component({
  selector: 'app-receta-preview',
  templateUrl: './receta-preview.component.html',
  styleUrls: ['./receta-preview.component.scss']
})
export class RecetaPreviewComponent implements OnInit {

  @Input() titulo = 'título de la categoria';
  @Input() receta: IReceta;

  @Output() showItem: EventEmitter<IReceta> = new EventEmitter();
  @Output() add2cart: EventEmitter<IReceta> = new EventEmitter();
  @Output() add2Favorite: EventEmitter<IReceta> = new EventEmitter();


  bases = './../../../assets/img/bases/';

  constructor() { }

  ngOnInit(): void {
    
  }

  /**
   * Visualizará la receta con todo lo que le acompañe
   * @param receta 
   */
  ver(receta: IReceta)
  {
    this.showItem.emit(receta);
  }

  /**
   * Pedirá información del mail al que enviar el link de la receta,
   * para que otro usuario reciba la receta.
   * @param receta 
   */
  sendMail(receta: IReceta)
  {
    console.log('Enviar por mail');
  }

  /**
   * Copiará el link directo de la receta en memoria para poder
   *  enviar el link a quien se desee
   * @param receta 
   */
  copyLink(receta: IReceta)
  {
    console.log('Copiar link');
  }

  /**
   * Añadirá la receta al listado personal de menú
   * @param receta 
   */
  AddtoCart(receta: IReceta)
  {
      console.log('Añadir al menú del día');
      this.add2cart.emit(receta);
  }

  /**
   * Añadirá la receta al listado de favoritos del usuario
   * @param receta 
   */
  favorite(receta: IReceta)
  {
    console.log('Añadir a favoritos');
    this.add2Favorite.emit(receta);
  }

}
