import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';


const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'pagina404',
        loadChildren: () =>
          import('./pagina404/pagina404.module').then(
            (m) => m.Pagina404Module
          ),
      },
      {
        path: 'contacto',
        loadChildren: () =>
          import('./contacto/contacto.module').then(
            (m) => m.ContactoModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./inicio/inicio.module').then(
            (m) => m.InicioModule
          ),
      },

      {
        path: 'login',
        loadChildren: () =>
          import('./forms/login/login.module').then(
            (m) => m.LoginModule
          ),
      },
      {
        path: 'registro',
        loadChildren: () =>
          import('./forms/registro/registro.module').then(
            (m) => m.RegistroModule
          ),
      },
      {
        path: 'active/:token',
        loadChildren: () =>
          import('./forms/active/active.module').then(
            (m) => m.ActiveModule
          ),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
