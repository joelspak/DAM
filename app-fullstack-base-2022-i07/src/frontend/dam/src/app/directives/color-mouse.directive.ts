import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[colorMouse]'
})
export class ColorMouseDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.changeBackgroundColor('lightgrey'); // Cambiar al color deseado
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeBackgroundColor(null); // Volver al color original (null o '')
  }

  private changeBackgroundColor(color: string | null) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }
}
