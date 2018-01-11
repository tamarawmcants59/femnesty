import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ChatListnerService {
    private _listners = new Subject<any>();

    listen(): Observable<any> {
        return this._listners.asObservable();
    }

    onChatHeadClick(chat: object){
        //console.log(chat);
        this._listners.next(chat);
    }
}
