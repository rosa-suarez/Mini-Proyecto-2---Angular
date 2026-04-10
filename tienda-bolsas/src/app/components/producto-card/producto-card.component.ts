import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './producto-card.html',
  styleUrl: './producto-card.css'
})

export class ProductoCardComponent {

  @Input() producto: any;

  @Output() agregarClick = new EventEmitter<any>();

  agregar() {
    this.agregarClick.emit(this.producto);
  }
}