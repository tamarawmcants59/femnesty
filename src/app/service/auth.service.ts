import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  public isAuthenticated(): boolean {
    try {
      const token = localStorage.getItem('isLoggedIn') || null;
      if (!token) {
        return false;
      }
      return true;
    }catch(err) {

    }
  }
  
}
