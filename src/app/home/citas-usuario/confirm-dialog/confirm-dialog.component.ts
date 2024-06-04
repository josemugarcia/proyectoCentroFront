import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteCitaConfirmationComponent } from '../../../panel-admin/citas/delete-cita-confirmation/delete-cita-confirmation.component';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteCitaConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
