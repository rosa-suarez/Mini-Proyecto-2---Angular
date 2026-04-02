import { Routes } from '@angular/router';

import { Home } from './pages/home/home.component';
import { Catalogo } from './pages/catalogo/catalogo.component';
import { Detalle } from './pages/detalle/detalle.component';
import { Carrito } from './pages/carrito/carrito.component';
import { Contacto } from './pages/contacto/contacto.component';
import { AgregarProducto } from './pages/agregar-producto/agregar-producto.component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'catalogo', component: Catalogo },
  { path: 'producto/:id', component: Detalle },
  { path: 'carrito', component: Carrito },
  { path: 'contacto', component: Contacto },
  { path: 'agregar', component: AgregarProducto }
];