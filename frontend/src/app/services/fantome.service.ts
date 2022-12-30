import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Fantome } from '../fantome';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FantomeService {
  private fantomesUrl = environment.apiUrl; // URL to web api

  constructor(
    private http:HttpClient) { }

  /** GET: get the all the fantomes from the server */
  getFantomes(): Observable<Fantome[]>{

   return this.http.get<Fantome[]>(this.fantomesUrl + '/all')
  }

  /** GET: get the fantome from the server */
    getFantome(id:string):Observable<Fantome>{

    return this.http.get<Fantome>(this.fantomesUrl + '/user/' + id)
  }

  /** PUT: update the fantome on the server */
  updateFantome(fantome: Fantome, localId:string, friend?: string, action?:string, role?:string): Observable<any> {
    const body = new URLSearchParams();
 
    if (friend){
      body.set('friend', friend);
      if (action && action?.toLocaleLowerCase() === 'add' || action?.toLocaleLowerCase() === 'remove'){
        body.set('action', action);
      }
    }
    else if (role){
      body.set('role', role);
    }
    
    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      )
    };
    return this.http.put(this.fantomesUrl + '/update/' + localId, body.toString(), options);
  }
}
