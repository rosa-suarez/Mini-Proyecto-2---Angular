import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class DetalleComponent implements OnInit {

  producto: any = null;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params : any) => {

      const id = Number(params.get('id'));
      console.log('ID:', id); 

      this.productosService.getProducto(id).subscribe({
        next: (data : any) => {
          console.log('DATA:', data); 
          this.producto = data;
          this.cd.detectChanges(); 
        },
        error: (err : any) => {
          console.error(err);
        }
      });
    });
  }
}