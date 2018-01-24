import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PostListnerService {
    private _listners = new Subject<any>();

    listen(): Observable<any> {
        return this._listners.asObservable();
    }

    onPostAdd(msg: string){
        this._listners.next(msg);
    }
}
