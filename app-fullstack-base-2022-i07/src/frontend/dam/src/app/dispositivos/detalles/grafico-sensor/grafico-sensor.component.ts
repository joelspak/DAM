//correr antes npm install --save highcharts
import { Component, OnInit } from '@angular/core';
import { DispositivoService } from 'src/app/services/dispositivo.service';
import { ActivatedRoute } from '@angular/router';

import * as Highcharts from 'highcharts';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-grafico-sensor',
  templateUrl: './grafico-sensor.component.html',
  styleUrls: ['./grafico-sensor.component.scss'],
})

export class GraficoSensorComponent implements OnInit {

  public valorObtenido: number=0;
  public myChart: any = 0;
	private chartOptions: any = 0;
  public dispositivoId: number = 0;
  

  constructor(private dispositivoService: DispositivoService, private route: ActivatedRoute) { 
    // setTimeout(()=>{
    //   console.log("Cambio el valor del sensor");
    //   this.valorObtenido=this.dispositivoService.getUltimaMedicion(this.dispositivoId);
    //   console.log(this.valorObtenido)
    //   //llamo al update del chart para refrescar y mostrar el nuevo valor
    //   this.myChart.update({series: [{
    //       name: 'Cb',
    //       data: [this.valorObtenido],
    //       tooltip: {
    //           valueSuffix: ' Cb'
    //       }
    //   }]});
    // },1000);
  }


  async ngOnInit() {
    this.dispositivoId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.dispositivoId);
    try {
      const consulta = await this.dispositivoService.getUltimaMedicion(this.dispositivoId);
      this.valorObtenido = Number(consulta[0].valor);
      console.log(this.valorObtenido);
      this.ionViewDidEnter();
    } catch (error) {
      console.log(error);
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
            text: 'kPA'
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
        name: 'Presión:',
        data: [this.valorObtenido],
        tooltip: {
            valueSuffix: ' Cb'
        }
    }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }

}