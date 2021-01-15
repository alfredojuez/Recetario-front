import { Component, OnInit } from '@angular/core';
import { IMeData } from '@core/interfaces/session.interface';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-barralateral',
  templateUrl: './barralateral.component.html',
  styleUrls: ['./barralateral.component.scss']
})
export class BarralateralComponent implements OnInit {

  session: IMeData = {
    status: false,
  };

  tengoAcceso = false;
  perfil: string;

  constructor(private authService: AuthService) {
    this.authService.accessVar$.subscribe((result: IMeData) => {
      this.session = result;
      this.tengoAcceso = this.session.status;
      this.perfil = this.session.usuario.perfil;
    });
  }

  ngOnInit(): void {
  }

}
