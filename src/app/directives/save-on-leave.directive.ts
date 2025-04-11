import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[saveOnLeave]'
})
export class SaveOnLeaveDirective {

    private el = inject(ElementRef);

    @HostListener('mouseleave') onMouseLeave() {
      console.log("bye");
      console.log(this.el.nativeElement.innerText);      
      
    }

  constructor() {
  }

}
