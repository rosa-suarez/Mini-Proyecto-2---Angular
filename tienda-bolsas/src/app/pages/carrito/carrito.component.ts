import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos'; 

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class CarritoComponent {

  constructor(
    public carritoService: CarritoService,
    private productosService: ProductosService 
  ) {}

  pagar() {

    const items = this.carritoService.carrito();

    if (items.length === 0) {
      alert('Carrito vacío');
      return;
    }

    items.forEach((p: any) => {

      const nuevoStock = Math.max(0, (p.stock || 0) - (p.cantidad || 1));

      const actualizado = {
        ...p,
        stock: nuevoStock
      };

      this.productosService.actualizarProducto(p.id, actualizado)
        .subscribe({
          next: (res) => console.log('Respuesta PUT:', res),
          error: (err) => console.error(err)
        });

    });

    alert('Pago realizado');

    // vaciar carrito
    this.carritoService.carrito.set([]);
    window.location.reload();
  }

}