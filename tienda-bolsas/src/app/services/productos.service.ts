import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProductos() {
    return this.http.get(`${this.API}/productos`);
  }

  getProducto(id: number) {
    return this.http.get(`${this.API}/productos/${id}`);
  }

  /*
  getProductos() {
    return this.http.get<any[]>(`${this.API}/productos`);
  }

  getProducto(id: number) {
    return this.http.get<any>(`${this.API}/productos/${id}`);
  }
  */
 
  agregarProducto(data:any) {
    return this.http.post(`${this.API}/productos`, data);
  }
}