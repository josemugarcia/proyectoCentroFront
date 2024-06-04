import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-confirm-password-dialog',
  templateUrl: './confirm-password-dialog.component.html',
  styleUrls: ['./confirm-password-dialog.component.css']
})
export class ConfirmPasswordDialogComponent {
  password: string = '';
  adminPassword: string = '';
  showError: boolean = false; 
  constructor(
    public dialogRef: MatDialogRef<ConfirmPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getAdmin().subscribe(
      (response: any) => {
        console.log(response); // Verifica la estructura de la respuesta
        this.userService.getAdmin().subscribe(
          (response: any[]) => {
            console.log(response); // Verifica la estructura de la respuesta
            this.adminPassword = response[0].password; // Asigna la contraseña del administrador
          },
          (error: any) => {
            console.error('Error obteniendo datos del admin', error);
          }
        );
        // Asigna la contraseña del administrador
      },
      (error: any) => {
        console.error('Error obteniendo datos del admin', error);
      }
    );
  }
  

  onConfirm(): void {
    if (this.password === this.adminPassword) {
      this.dialogRef.close(true);
    } else {
      this.showError = true;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  
  
}
