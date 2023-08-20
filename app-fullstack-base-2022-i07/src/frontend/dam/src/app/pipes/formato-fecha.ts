import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'FormatoFecha'
})
export class FormatoFechaPipe implements PipeTransform {
  transform(value: any): any {
    const fechaPipe = new DatePipe('en-US');
    return fechaPipe.transform(value, 'dd-MM-yy HH:mm:ss');
  }
}
