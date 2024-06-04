import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CitaService } from '../../services/cita.service';
import { AuthService } from '../../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-citas-usuario',
  templateUrl: './citas-usuario.component.html',
  styleUrls: ['./citas-usuario.component.css']
})
export class CitasUsuarioComponent implements OnInit {
  usuario_id: number = 0;
  citas: any[] = [];

  constructor(
    private citaService: CitaService,
    private authService: AuthService,
    private toast: NgToastService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.usuario_id = this.authService.getIdUsuario() || 0;
    this.loadCitas();
  }

  loadCitas(): void {
    this.citaService.getCitasByUsuario(this.usuario_id).subscribe(
      (data) => {
        this.citas = data;
        console.log(this.citas);
      },
      (error) => {
        console.error('Error al obtener citas:', error);
      }
    );
  }

  cancelarCita(idCita: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { title: 'Confirmar Cancelación', message: '¿Estás seguro de que deseas cancelar esta cita?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.citaService.delete(idCita).subscribe(
          (response) => {
            this.toast.success({ detail: 'Cita Cancelada', summary: 'La cita ha sido cancelada con éxito.', duration: 5000 });
            this.loadCitas(); // Recargar la lista de citas después de la cancelación
          },
          (error) => {
            this.toast.error({ detail: 'Error', summary: 'Error al cancelar la cita.', duration: 5000 });
            console.error('Error al cancelar la cita:', error);
          }
        );
      }
    });
  }
}
