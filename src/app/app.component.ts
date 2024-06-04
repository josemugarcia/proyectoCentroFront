import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerService } from './services/spinner.service';
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog aquí
import { MedicosComponent } from './panel-admin/medicos/medicos.component';
import { AddEddMedicoComponent } from './panel-admin/medicos/add-edd-medico/add-edd-medico.component';
import * as moment from 'moment';
import 'moment/locale/es';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // El nombre de la propiedad es 'styleUrls' en lugar de 'styleUrl'
})
export class AppComponent {
  
  title = 'hospital_angular2';
  constructor(private spinnerService: SpinnerService, private dialog: MatDialog) { } // Agrega MatDialog aquí

  openSpinner() {
    this.spinnerService.open();
  }

  openAddEditMedicoForm(){
    this.dialog.open(AddEddMedicoComponent);
  }
  
}
