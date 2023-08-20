import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { DispositivosPage } from '../dispositivos/dispositivos.page';
import { MedicionesComponent } from '../dispositivos/mediciones/mediciones.component';
import { LogRiegoComponent } from '../dispositivos/log-riego/log-riego.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'dispositivos/:id',
    component: DispositivosPage
  }, 
  {
    path: 'dispositivos/:id/mediciones',
    component: MedicionesComponent
  },
  {
    path: 'dispositivos/:id/riegos',
    component: LogRiegoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}