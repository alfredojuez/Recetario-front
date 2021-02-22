import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  // para ocultar el menu con la hamburguesa
  puedoMostrarMenu = true;
  @Output() eventoMostrarMenu = new EventEmitter<boolean>();
  mostrarMenu()
  {
    if (this.puedoMostrarMenu === undefined)
    {
      // si no lo tenemos, lo inicializamos a true
      this.puedoMostrarMenu = true;
    }
    // si se pide cambio de estado, se niega el estado actual.
    this.puedoMostrarMenu = !this.puedoMostrarMenu ;
    console.log('Mostrar menu: ' + this.puedoMostrarMenu);
    // emitimos el valor obtenido
    this.eventoMostrarMenu.emit(this.puedoMostrarMenu);
  }
  // fin ocultar


  constructor() { }

  ngOnInit(): void {
  }

}
