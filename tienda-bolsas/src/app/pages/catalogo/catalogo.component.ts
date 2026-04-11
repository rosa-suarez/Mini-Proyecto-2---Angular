import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito';
import { ChangeDetectorRef } from '@angular/core';
import { ProductoCardComponent } from '../../components/producto-card/producto-card.component';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductoCardComponent],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class CatalogoComponent implements OnInit {

  productos: any[] | null = null;

  constructor(
    private productosService: ProductosService,
    private carritoService: CarritoService,
    private cd: ChangeDetectorRef
    //private router: Router
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  agregar(producto: any) {

    const carrito = this.carritoService.carrito();
    const enCarrito = carrito.find(p => p.id === producto.id);
    const cantidadActual = enCarrito ? (enCarrito.cantidad || 1) : 0;

    if (cantidadActual >= producto.stock) {
      alert('No hay más existencias disponibles ❌');
      return;
    }

    this.carritoService.agregar(producto);
    alert('Agregado al carrito ✅');
  }

  cargarProductos() {
    this.productosService.getProductos().subscribe({
      next: (data: any) => {
        this.productos = data;
        this.cd.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }
}