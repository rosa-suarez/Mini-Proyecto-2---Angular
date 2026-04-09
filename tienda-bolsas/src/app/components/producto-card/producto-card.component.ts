import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div>
      <h3>{{ producto.nombre | uppercase }}</h3>
      <p>{{ producto.precio | currency }}</p>

      <button [routerLink]="['/producto', producto.id]">
        Ver detalle
      </button>

      <button (click)="agregar()">
        Agregar al carrito
      </button>

      <hr>
    </div>
  `
})

export class ProductoCardComponent {

  @Input() producto: any;

  @Output() agregarClick = new EventEmitter<any>();

  agregar() {
    this.agregarClick.emit(this.producto);
  }
}