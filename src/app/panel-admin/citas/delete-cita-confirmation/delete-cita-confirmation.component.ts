import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-cita-confirmation',
  templateUrl: './delete-cita-confirmation.component.html',
  styleUrl: './delete-cita-confirmation.component.css'
})
export class DeleteCitaConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteCitaConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
