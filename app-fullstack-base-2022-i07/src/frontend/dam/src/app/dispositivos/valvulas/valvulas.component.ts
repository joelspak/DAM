import { Component, OnInit } from '@angular/core';
import { DispositivoService } from 'src/app/services/dispositivo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-valvulas',
  templateUrl: './valvulas.component.html',
  styleUrls: ['./valvulas.component.scss']
})
export class ValvulasComponent implements OnInit {

  public abrir: boolean = false;
  public evId: number = 0;
  public dispositivoId: number = 0;
  public tiempoCerrar: number = 5000;
  private cierreAutomatico: any;
  public actualizaApertura: any;


  constructor(private dispositivoService: DispositivoService, private route: ActivatedRoute) {}

ngOnInit() {}

  async toggle() {
    this.dispositivoId=Number(this.route.snapshot.paramMap.get('id'));
    this.evId = await this.dispositivoService.getValvulas(this.dispositivoId);
    this.abrir = !this.abrir;
    if (this.abrir) {
      console.log('abre');
      // cuando se abre debe colocar el dato en la tabla log-riegos, apertura=1, fecha=now, electrovalvulaId=evId.
      this.actualizaApertura=this.dispositivoService.sendAbrirElectrovalvula(this.evId);
      console.log(this.evId);
          
      // la válvula se cierra automáticamente luego de 5 segundos, solo para simular un riego
      this.cierreAutomatico = setTimeout(() => {
      this.cierraValvula();
    }, this.tiempoCerrar);
          
    } else {
      this.cierraValvula();
      clearTimeout(this.cierreAutomatico);
    }
  }


async cierraValvula() {
        // cuando se cierra debe colocar el dato en la tabla log-riegos, apertura=0, fecha=now, electrovalvulaId=evId.
      // y en mediciones la nueva medición con fecha=now, dispositivoId=dispositivoId, 
  console.log('cierra');
  this.dispositivoService.sendCerrarElectrovalvula_riegos(this.evId);
  console.log(this.evId);
  const value = await this.dispositivoService.getUltimaMedicion(this.dispositivoId);
  const new_value = Number(value[0].valor)/2;
  await this.dispositivoService.sendCerrarElectrovalvula_mediciones(this.dispositivoId, new_value)

  this.abrir=false;
}


}
