import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(private _http: HttpClient) { }

  getListadoDispositivos (): Promise<any> {
    return firstValueFrom(this._http.get('http://localhost:8000/dispositivo'))
  }

  getMediciones (): Promise<any> {
    return firstValueFrom(this._http.get('http://localhost:8000/dispositivo/medicion/${id}'))
  }

  getDispConUltimaMedicion (): Promise<any> {
    return firstValueFrom(this._http.get('http://localhost:8000/dispositivo/ultima_medicion'))
  }

  getLogRiegos (): Promise<any> {
    return firstValueFrom(this._http.get('http://localhost:8000/dispositivo/log-riegos/${id}'))
  }

}
