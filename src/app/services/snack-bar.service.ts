import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-Bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private  snackBar:MatSnackBar) { }

  
}
