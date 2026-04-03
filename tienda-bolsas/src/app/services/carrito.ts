import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carrito = signal<any[]>([]);

  agregar(producto: any) {
    this.carrito.update(items => [...items, producto]);
  }

  eliminar(index: number) {
    this.carrito.update(items => items.filter((_, i) => i !== index));
  }

  total() {
    return this.carrito().reduce((acc, p) => acc + p.precio, 0);
  }
}