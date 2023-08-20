import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DispositivosPageRoutingModule } from './dispositivos-routing.module';
import { FormatoFechaPipe } from '../pipes/formato-fecha';
import { DispositivosPage } from './dispositivos.page';

import { GraficoSensorComponent } from './detalles/grafico-sensor/grafico-sensor.component';
import { MedicionesComponent } from './mediciones/mediciones.component';
import { LogRiegoComponent } from './log-riego/log-riego.component';
import { ValvulasComponent } from './valvulas/valvulas.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispositivosPageRoutingModule
  ],
  declarations: [
    DispositivosPage,
    GraficoSensorComponent,
    MedicionesComponent,
    LogRiegoComponent,
    ValvulasComponent,
    FormatoFechaPipe
  ]
})
export class DispositivosPageModule {}
