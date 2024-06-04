import { Component, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { GlobalConstants } from '../../../shared/globalsConstants';

@Component({
  selector: 'app-edd-user',
  templateUrl: './edd-user.component.html',
  styleUrls: ['./edd-user.component.css']
})
export class EddUserComponent {
  onEditUsuario = new EventEmitter();
  usuarioForm: FormGroup;
  dialogAction: string = ''; 
  errorMessage: string = '';
  responseMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EddUserComponent>,
  ) {
    this.usuarioForm = this.formBuilder.group({
      nombre: [null, [Validators.required, Validators.pattern(GlobalConstants.nombre)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.email)]],
      telefono: [null, [Validators.required, Validators.pattern(GlobalConstants.telefono)]],
      id: [null],
      password: [null, Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    if (this.dialogData) {
      this.dialogAction = this.dialogData.action;
      if (this.dialogAction === 'Edit') {
        this.usuarioForm.patchValue(this.dialogData.data);
      }
    }
  }

  handleSubmit() {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }
    this.edit();
  }

  edit() {
    const formData = this.usuarioForm.value;

    if (!formData.id) {
      console.error('El ID del usuario no está definido.');
      return;
    }

    const data = {
      id: formData.id,
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      password: formData.password // Incluir la nueva contraseña en los datos a enviar al backend
    };

    this.userService.update(data).subscribe(
      (response: any) => {
        this.dialogRef.close(true);
        this.onEditUsuario.emit();
        this.responseMessage = response.message;
        this.reloadPage();
      },
      (error) => {
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        if (error.status === 400) {
          this.errorMessage = 'El usuario con este email ya existe.';
        }
      }
    );
  }

  togglePasswordVisibility(field: string, event: Event): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
    event.preventDefault(); // Evitar la propagación del evento al formulario
  }

  // Función de validación para verificar que las contraseñas coincidan
  // Función de validación para verificar que las contraseñas coincidan
passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  // Verificar si password y confirmPassword no son null
  if (password !== null && confirmPassword !== null) {
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword.setErrors(null);
      return null;
    }
  } else {
    return null;
  }
}
onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault();
    this.handleSubmit();
    
   
  }
}


reloadPage() {
  window.location.reload();
} 

}
