import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DispositivoService } from 'src/app/services/dispositivo.service';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.component.html',
  styleUrls: ['./mediciones.component.scss'],
})
export class MedicionesComponent  implements OnInit {

  constructor(private dispositivoService: DispositivoService, private route: ActivatedRoute) { }

  public dispositivoId: number = 0;
  public mediciones: any[]=[]

  ngOnInit() {
    this.dispositivoId=Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerMediciones();

  }

  async obtenerMediciones() {
    try {
      this.mediciones = await this.dispositivoService.getMediciones(this.dispositivoId);
      console.log('encontré mediciones')
    } catch (error) {
      console.log(error);
    }
  }

}
