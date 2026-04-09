import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carrito = signal<any[]>([]);

  agregar(producto: any) {
    this.carrito.update(items => {

      const existe = items.find(p => p.id === producto.id);

      if (existe) {
        return items.map(p =>
          p.id === producto.id
            ? { ...p, cantidad: (p.cantidad || 1) + 1 }
            : p
        );
      }

      return [...items, { ...producto, cantidad: 1 }];
    });
  }

  eliminar(index: number) {
    this.carrito.update(items => items.filter((_, i) => i !== index));
  }

  total() {
    return this.carrito().reduce(
      (acc, p) => acc + (p.precio * (p.cantidad || 1)),
      0
    );
  }
}