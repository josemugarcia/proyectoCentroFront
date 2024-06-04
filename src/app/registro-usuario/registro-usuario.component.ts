import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { GlobalConstants } from '../shared/globalsConstants';
import { SpinnerService } from '../services/spinner.service';

import {NgToastService} from 'ng-angular-popup'

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrl: './registro-usuario.component.css'
})
export class RegistroUsuarioComponent {


  password = true;
  confirmPassword= true;
  signupForm:any = FormGroup;
  responseMessage:any;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;


  constructor(private formBuilder:FormBuilder, private router:Router,private userService:UserService,private spinnerService: SpinnerService , private toast: NgToastService){

  }



  openSpinner() {
    this.spinnerService.open();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }

  ngOnInit(): void{
    this.signupForm = this.formBuilder.group({
      nombre:[null,[Validators.required,Validators.pattern(GlobalConstants.nombre)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.email)]],
      telefono:[null,[Validators.required,Validators.pattern(GlobalConstants.telefono)]],
      password:[null,[Validators.required,Validators.pattern(GlobalConstants.password)]],
      confirmPassword:[null,[Validators.required]],
    });
  }

  togglePasswordVisibility(field: string, event: Event): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
    event.preventDefault(); // Evitar la propagación del evento al formulario
  }
  
  

  validateSubmit(){
    if(this.signupForm.controls['password'].value != this.signupForm.controls['confirmPassword'].value){
      return true;
    }else{
      return false;
    }
  }

  handleSubmit(){
    var formData = this.signupForm.value;
    var data = {
      nombre:formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      password: formData.password
    }

    this.userService.signup(data).subscribe((response:any)=>{
      this.responseMessage= response?.message;
      this.toast.success({detail:"Usuario Registrado correctamente!!",duration:5000})
      this.router.navigate(['/login'])
    }, (error)=>{
      if(error.error?.message){

       
          if (error.status === 400) {
      this.toast.error({ detail: "El email ya existe" });
    }
        
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
    })
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSubmit();
      this.openSpinner();
    }
  }

}
