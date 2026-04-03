import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class CatalogoComponent implements OnInit {

  productos: any[] = [];

  constructor(
    private productosService: ProductosService,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.productosService.getProductos().subscribe({
      next: (data: any) => {
        this.productos = data;
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  agregar(producto: any) {
    this.carritoService.agregar(producto);
    alert('Agregado al carrito');
  }
}