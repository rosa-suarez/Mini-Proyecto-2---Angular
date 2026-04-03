import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductosService } from '../../services/productos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-producto.html'
})
export class AgregarProductoComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService
  ) {
    this.form = this.fb.group({
      nombre: [''],
      categoria: [''],
      marca: [''],
      precio: [''],
      stock: [''],
      imagen: [''],
      descripcion: [''],
      disponible: [true]
    });
  }

  guardar() {
    this.productosService.agregarProducto(this.form.value).subscribe(() => {
      alert('Producto guardado');
      this.form.reset();
    });
  }
}