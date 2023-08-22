import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(private _http: HttpClient) { }

  getListadoDispositivos (): Promise<any> {
    return firstValueFrom(this._http.get('http://localhost:8000/dispositivo'))
  }

  getMediciones (id: number): Promise<any> {
    return firstValueFrom(this._http.get(`http://localhost:8000/dispositivo/medicion/${id}`))
  }

  getDispConUltimaMedicion (): Promise<any> {
    return firstValueFrom(this._http.get('http://localhost:8000/dispositivo/ultima_medicion'))
  }

  getUltimaMedicion (id: number): Promise<any> {
    return firstValueFrom(this._http.get(`http://localhost:8000/dispositivo/ultima_medicion_valor/${id}`))
  }

  getValvulas (id: number): Promise<any> {
    return firstValueFrom(this._http.get(`http://localhost:8000/dispositivo/valvula/${id}`))
  }

  getLogRiegos (id: number): Promise<any> {
    return firstValueFrom(this._http.get(`http://localhost:8000/dispositivo/log-riegos/${id}`))
  }


  sendAbrirElectrovalvula(electrovalvulaId: any): Promise<any> {
    return firstValueFrom(this._http.post('http://localhost:8000/dispositivo/abrir', electrovalvulaId));
  }

  sendCerrarElectrovalvula_riegos(electrovalvulaId: any): Promise<any> {
    return firstValueFrom(this._http.post('http://localhost:8000/dispositivo/cerrar', electrovalvulaId));
  }

  sendCerrarElectrovalvula_mediciones(dispositivoId: number, valor: number): Promise<any> {
    return firstValueFrom(this._http.post('http://localhost:8000/dispositivo/cerrar_medicion', {dispositivoId, valor}));
  }

}
