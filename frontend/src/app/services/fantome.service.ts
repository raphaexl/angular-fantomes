import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Fantome } from '../fantome';
import { FANTOMES } from '../mock-fantomes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FantomeService {
  private fantomesUrl = environment.apiUrl; // URL to web api
  constructor(
    private http:HttpClient) { }


  getFantomes(): Observable<Fantome[]>{
    //const fantomes = of(FANTOMES);
     //return fantomes;
    /* const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  const requestOptions = { headers: headers };
  console.log("Token : ",localStorage.getItem('token') )*/
   return this.http.get<Fantome[]>(this.fantomesUrl + '/all')
  }

 // getFantome(id:number):Observable<Fantome>{
    getFantome(id:string):Observable<Fantome>{
    /*const fantome = FANTOMES.find(fantome => fantome.id === id)!;
    return of(fantome);*/
    return this.http.get<Fantome>(this.fantomesUrl + '/user/' + id)
  }
/*
  updateFantome(id:string):Observable<Fantome>{
    return this.http.put<Fantome>(this.fantomesUrl + '/update/' + id)
  }*/
}
