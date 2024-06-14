import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/globalsConstants';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../services/auth.service'; 
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;
  showPassword: boolean = false;
  responseMessage: any;
  usuarioId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private spinnerService: SpinnerService,
    private toast: NgToastService,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.email)]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.email)]],
      password: [null, [Validators.required]],
    });
  }

  handleSubmit() {
    const formData = this.loginForm.value;
    const data = {
      email: formData.email,
      password: formData.password,
    };

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.userService.login(data).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.authService.setNombreUsuario(response.nombreUsuario);
        this.authService.setRolUsuario(response.rolUsuario);
        this.authService.setIdUsuario(response.idUsuario);
        this.usuarioId = response.idUsuario;

        if (response.rolUsuario === 'admin') {
          this.router.navigateByUrl('/panel_admin/dashboard');
        } else {
          this.router.navigateByUrl('/home/inicio');
        }

        this.toast.success({
          detail: `Usuario:  ${response.nombreUsuario}`,
          summary: response.message,
          duration: 5000
        });
      },
      (error) => {
        if (error.status === 401) {
          this.toast.error({ detail: "Acceso denegado", summary: "No tienes permisos para acceder", duration: 5000 });
        } else if (error.error?.message) {
          this.responseMessage = error.error?.message;
          this.toast.error({ detail: "Credenciales incorrectas", summary: "Error de inicio de sesión", duration: 5000 });
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
      }
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  openSpinner() {
    this.spinnerService.open();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSubmit();
      this.openSpinner();
    }
  }
}
