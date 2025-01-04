import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../services/user/user';


@Component({
  selector: 'app-profile-template',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-template.component.html',
  styleUrl: './profile-template.component.css'
})
export class ProfileComponent {
  @Input() user!: User;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      email: [''],
      first_name: [''],
      last_name: [''],
      address: [''],
      phone: [''],
    });
  }

  ngOnChanges(): void {
    if (this.user) {
      this.profileForm.patchValue(this.user);
    }
  }

  onSave(): void {
    if (this.profileForm.valid) {
      const updatedUser = this.profileForm.value;
      console.log('Datos actualizados del usuario:', updatedUser);
      // Aquí puedes llamar al servicio para guardar los cambios.
    }
  }
}