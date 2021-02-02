import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '@core/guards/admin.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
      },
      {
        path: 'categorias',
        loadChildren: () =>
          import('./categorias/categorias.module').then((m) => m.CategoriasModule),
      },
      {
        path: 'ingredientes',
        loadChildren: () =>
          import('./ingredientes/ingredientes.module').then((m) => m.IngredientesModule),
      },
      {
        path: 'nacionalidades',
        loadChildren: () =>
          import('./nacionalidades/nacionalidades.module').then((m) => m.NacionalidadesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
