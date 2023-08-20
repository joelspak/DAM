import { Component, OnInit } from '@angular/core';
import { DispositivoService } from 'src/app/services/dispositivo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-detalles',
   templateUrl: './detalles.component.html',
   styleUrls: ['./detalles.component.scss'],
 })

export class DetallesComponent implements OnInit {

  public dispositivoId: number = 0;


  constructor(private dispositivoService: DispositivoService, private route: ActivatedRoute) {}

  async ngOnInit() {
    this.dispositivoId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.dispositivoId);
  }

}