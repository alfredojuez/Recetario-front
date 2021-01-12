import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/@graphql/services/api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    console.log("Estoy en el init");
    this.api.login('alfredojuez@hotmail.com',
                   'alfredojuez').subscribe(result => {
      console.log(result);
    });

  }

}
