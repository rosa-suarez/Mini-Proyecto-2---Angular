import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MensajesService } from '../../services/mensajes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class ContactoComponent {

  constructor(private mensajesService: MensajesService) {}

  enviar(form: any) {
    this.mensajesService.enviarMensaje(form.value).subscribe(() => {
      alert('Mensaje enviado');
      form.reset();
    });
  }
}