import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, fromEvent, interval, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DispositivoService } from '../services/dispositivo.service';
import { DispositivosPage } from '../dispositivos/dispositivos.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  dispositivos: any[] = []; 
  public dispositivoId: number = 0;


  constructor(private dispositivoService: DispositivoService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.obtenerDispositivos();
    this.dispositivoId=Number(this.route.snapshot.paramMap.get('id'));

  }

  async obtenerDispositivos() {
    try {
      this.dispositivos = await this.dispositivoService.getDispConUltimaMedicion();
    } catch (error) {
      console.log(error);
    }
  }

}