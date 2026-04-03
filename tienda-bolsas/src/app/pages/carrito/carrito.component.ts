import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class CarritoComponent {

  constructor(public carritoService: CarritoService) {}

}
