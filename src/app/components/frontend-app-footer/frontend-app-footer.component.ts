import { Component, ElementRef } from '@angular/core';
//import { DatePipe } from '@angular/common';

@Component({
  selector: 'frontend-app-footer',
  templateUrl: './frontend-app-footer.component.html'
})
export class FrontendAppFooter {
  current_year='';
  public pageContactData:string ='';
  constructor(private el: ElementRef) { }

  //wait for the component to render completely
  ngOnInit(): void {
    var nativeElement: HTMLElement = this.el.nativeElement,
    parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);
    //this.current_year=Date();
    this.pageContactData='contact-us';
  }
}
