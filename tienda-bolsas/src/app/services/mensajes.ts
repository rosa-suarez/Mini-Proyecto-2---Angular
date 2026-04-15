import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  // private API = 'http://localhost:3000';
  private API = 'https://mini-proyecto-2-angular.onrender.com/';
  

  constructor(private http: HttpClient) {}

  enviarMensaje(data: any) {
    return this.http.post(`${this.API}/mensajes`, data);
  }
}