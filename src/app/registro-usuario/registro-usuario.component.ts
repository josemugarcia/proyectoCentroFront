import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { GlobalConstants } from '../shared/globalsConstants';
import { SpinnerService } from '../services/spinner.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  password = true;
  confirmPassword = true;
  signupForm!: FormGroup;
  responseMessage: any;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private spinnerService: SpinnerService, private toast: NgToastService) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      nombre: [null, [Validators.required, Validators.pattern(GlobalConstants.nombre)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.email)]],
      telefono: [null, [Validators.required, Validators.pattern(GlobalConstants.telefono)]],
      password: [null, [Validators.required, Validators.pattern(GlobalConstants.password)]],
      confirmPassword: [null, [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  openSpinner(): void {
    this.spinnerService.open();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  validateSubmit(): boolean {
    return this.signupForm.controls['password'].value !== this.signupForm.controls['confirmPassword'].value;
  }

  handleSubmit(): void {
    Object.keys(this.signupForm.controls).forEach(field => {
      const control = this.signupForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });

    this.signupForm.markAsDirty();

    if (this.signupForm.invalid) {
      return;
    }

    var formData = this.signupForm.value;
    var data = {
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      password: formData.password
    }

    this.userService.signup(data).subscribe((response: any) => {
      this.responseMessage = response?.message;
      this.toast.success({ detail: "Usuario Registrado correctamente!!", duration: 5000 })
      this.router.navigate(['/login'])
    }, (error) => {
      if (error.error?.message) {
        if (error.status === 400) {
          this.toast.error({ detail: "El email ya existe" });
        }
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
    })
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSubmit();
      this.openSpinner();
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

}
