import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-user',
  templateUrl: './delete-confirmation-user.component.html',
  styleUrl: './delete-confirmation-user.component.css'
})
export class DeleteConfirmationUserComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
