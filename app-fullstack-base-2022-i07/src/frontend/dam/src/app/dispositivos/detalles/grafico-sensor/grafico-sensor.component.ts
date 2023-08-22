//correr antes npm install --save highcharts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DispositivoService } from 'src/app/services/dispositivo.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';

import * as Highcharts from 'highcharts';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-grafico-sensor',
  templateUrl: './grafico-sensor.component.html',
  styleUrls: ['./grafico-sensor.component.scss'],
})

export class GraficoSensorComponent implements OnInit, OnDestroy {

  public valorObtenido: number=0; // para leer la última medición
  public valorActual: number=0; // para comparar última medición vs actual (y en función de eso cambiar el gráfico)
  public myChart: any = 0; 
	private chartOptions: any = 0;
  public dispositivoId: number = 0; // el Id del dispositivo en el que se está viendo el gráfico
  private subscripcion: Subscription | undefined;
  public timeUpdate: number = 1000; // tiempo para actualizar la consulta de la última medición.

  constructor(private dispositivoService: DispositivoService, private route: ActivatedRoute) {}

  async ngOnInit() {
    this.dispositivoId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.dispositivoId);
    this.actualizarValor();
    await this.obtenerValor();
  }

  async obtenerValor() {
    try {
      const consulta = await this.dispositivoService.getUltimaMedicion(this.dispositivoId);
      this.valorObtenido = Number(consulta[0].valor);
      console.log(this.valorObtenido);

      if (this.valorObtenido !== this.valorActual) {
        this.valorActual=this.valorObtenido;
        this.generarChart();
      }

    } catch (error) {
      console.log(error);
    }
  }

  actualizarValor() {
    this.subscripcion = interval(this.timeUpdate).subscribe(async () => {
      await this.obtenerValor();
    });
  }

  ngOnDestroy() {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
  }

  ionViewDidEnter() {
    this.generarChart();
  }

  generarChart() {
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        }
        ,title: {
          text: 'Sensor N°'+this.dispositivoId
        }

        ,credits:{enabled:false}
        
           
        ,pane: {
            startAngle: -150,
            endAngle: 150
        } 
        // the value axis
      ,yAxis: {
        min: 0,
        max: 100,
  
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',
  
        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'Cb'
        },
        plotBands: [{
            from: 0,
            to: 10,
            color: '#55BF3B' // green
        }, {
            from: 10,
            to: 30,
            color: '#DDDF0D' // yellow
        }, {
            from: 30,
            to: 100,
            color: '#DF5353' // red
        }]
    }
    ,
  
    series: [{
        name: 'Presión',
        data: [this.valorObtenido],
        tooltip: {
            valueSuffix: ' Cb'
        }
    }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }

}