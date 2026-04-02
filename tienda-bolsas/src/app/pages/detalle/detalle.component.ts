import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle implements OnInit {

  producto: any;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.productosService.getProducto(id).subscribe(data => {
      this.producto = data;
    });
  }
}