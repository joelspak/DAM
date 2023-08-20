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

  constructor(private dispositivoService: DispositivoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  toggle() {
    this.abrir = !this.abrir;
    if (this.abrir) {
      console.log('abre')
      // cuando se abre debe colocar el dato en la tabla log-riegos, apertura=1, fecha=now, electrovalvulaId=evId.
    } else {
      console.log('cierra')
      // cuando se cierra debe colocar el dato en la tabla log-riegos, apertura=0, fecha=now, electrovalvulaId=evId.
      // y en mediciones la nueva medición con fecha=now, dispositivoId=dispositivoId, 
    }
  }


}
