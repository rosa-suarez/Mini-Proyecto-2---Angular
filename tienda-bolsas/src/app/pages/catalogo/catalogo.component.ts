import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {

  productos: any[] = [];

  constructor(private productosService: ProductosService) {}

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
}