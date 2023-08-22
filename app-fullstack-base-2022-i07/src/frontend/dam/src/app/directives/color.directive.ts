import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective implements OnChanges {

  @Input() appValorColor: number = 0; // este es el valor de la medición

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    this.updateColor();
  }

  private updateColor() {
    let color: string = '';

    if (this.appValorColor >= 0 && this.appValorColor < 10) {
      color = 'green';
    } else if (this.appValorColor >= 10 && this.appValorColor < 30) {
      color = 'yellow';
    } else if (this.appValorColor >= 30 && this.appValorColor <= 60) {
      color = 'red';
    }

    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }
}
