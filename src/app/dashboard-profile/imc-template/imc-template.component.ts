import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../modal/modal.service';

@Component({
  selector: 'app-imc-template',
  imports: [FormsModule, CommonModule],
  templateUrl: './imc-template.component.html',
  styleUrls: ['./imc-template.component.css'],
})
export class ImcTemplateComponent {
  weight: number = 70; // Default weight
  height: number = 1.75; // Default height
  imc: number | null = null; // IMC result
  imcMessage: string = ''; // Message associated with IMC
  constructor(/* private fb: FormBuilder, private userService: UserService, */ private modalService: ModalService) {
  }
  calculateIMC(): void {
    if (this.weight > 0 && this.height > 0) {
      this.imc = parseFloat((this.weight / (this.height * this.height)).toFixed(2)); // Rounded to 2 decimals
      this.setImcMessage();
    }
  }

  private setImcMessage(): void {
    if (!this.imc) return;
    if (this.imc < 18.5) {
      this.imcMessage = 'Estás en bajo peso. Es importante consultar con un profesional de salud.';
    } else if (this.imc >= 18.5 && this.imc < 24.9) {
      this.imcMessage = 'Tienes un peso saludable. ¡Sigue cuidándote!';
    } else if (this.imc >= 25 && this.imc < 29.9) {
      this.imcMessage = 'Tienes sobrepeso. Considera llevar una dieta balanceada y hacer ejercicio.';
    } else {
      this.imcMessage = 'Tienes obesidad. Es importante consultar con un profesional de salud.';
    }
  }
  onCancel(): void {
    this.modalService.closeModal(); // Cierra el modal sin guardar cambios
  }
}
