import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  puedoMostrarMenu = true;
  mostrarMenu($event: boolean) {
    console.log('MENU: ' + $event);
    this.puedoMostrarMenu = $event;
  }

  constructor() {}

  ngOnInit(): void {}
}
