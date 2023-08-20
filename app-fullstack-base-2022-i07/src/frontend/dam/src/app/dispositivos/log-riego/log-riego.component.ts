import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DispositivoService } from 'src/app/services/dispositivo.service';

@Component({
  selector: 'app-log-riego',
  templateUrl: './log-riego.component.html',
  styleUrls: ['./log-riego.component.scss'],
})
export class LogRiegoComponent  implements OnInit {

  constructor(private dispositivoService: DispositivoService, private route: ActivatedRoute) { }

  public dispositivoId: number = 0;
  public evId: number = 0;
  public riegos: any[]=[]

  ngOnInit() {
    this.dispositivoId=Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerRiegos();
  }

  async obtenerRiegos() {
    try {
      const consulta = await this.dispositivoService.getValvulas(this.dispositivoId);
      this.evId = Number(consulta[0].electrovalvulaId);
      this.riegos = await this.dispositivoService.getLogRiegos(this.evId);
      console.log('encontré riegos')
    } catch (error) {
      console.log(error);
    }
  }

}