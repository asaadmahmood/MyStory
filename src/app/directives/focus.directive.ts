import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[msFocus]'
})
export class FocusDirective {

  constructor(private el: ElementRef) {
    setTimeout(() => {
      this.el.nativeElement.focus();
    });
  }

}
