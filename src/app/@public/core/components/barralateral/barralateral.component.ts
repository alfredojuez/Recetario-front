import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  userLabel = '';

  constructor(private authService: AuthService, private router: Router) {
    this.authService.accessVar$.subscribe((result: IMeData) => {
      this.session = result;
      this.tengoAcceso = this.session.status;
      this.perfil = (this.session.usuario) ? this.session.usuario.perfil : 'USER';
      this.userLabel = (this.session.usuario) ? `${this.session.usuario.nombre} ${this.session.usuario.apellidos}` : 'USUARIO VISITANTE';
    });
  }

  logout()
  {
    this.authService.resetSession();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

}
