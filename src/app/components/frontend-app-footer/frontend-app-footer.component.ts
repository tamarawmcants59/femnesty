import { ChatListnerService } from './../../service/chat.listner.service';
import { Component, ElementRef, OnInit } from '@angular/core';
//import { DatePipe } from '@angular/common';

@Component({
  selector: 'frontend-app-footer',
  templateUrl: './frontend-app-footer.component.html'
})
export class FrontendAppFooter implements OnInit {
  current_year = '';
  chatClass = 'hidden';
  public pageContactData: string = '';
  constructor(private el: ElementRef, private _chatListnerService: ChatListnerService) {
    this._chatListnerService.listen().subscribe((chat: any) => {
      this.openChatWindow(chat);
    });
  }

  //wait for the component to render completely
  ngOnInit(): void {
    const nativeElement: HTMLElement = this.el.nativeElement,
      parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);
    //this.current_year=Date();
    this.pageContactData = 'contact-us';
  }

  openChatWindow(chat) {
    console.log(chat);
    this.chatClass = '';
  }


}
