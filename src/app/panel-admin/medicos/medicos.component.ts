import { Component, AfterViewInit } from '@angular/core';
import { AddEddMedicoComponent } from './add-edd-medico/add-edd-medico.component';
import { MatDialog } from '@angular/material/dialog';
import { MedicoService } from '../../services/medico.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../../shared/globalsConstants';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { PageEvent } from '@angular/material/paginator';

interface Medico {
  nombreMedico: string;
  telefonoMedico: string | string[] | number;
  edadMedico: number;
  especialidadNombre: string;
  imagenMedico: string;
  idMedico: number;  // Asegúrate de tener esto si estás usando idMedico en deleteMedico
}

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
})
export class MedicosComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'nombreMedico',
    'telefonoMedico',
    'edadMedico',
    'especialidadNombre',
    'imagenMedico',
    'edit',
  ];
  dataSource: MatTableDataSource<Medico>;
  responseMessage: any;

  pageSizeOptions: number[] = [5, 10, 25];
  pageSize: number = 5;
  pageIndex: number = 0;
  totalItems: number = 0;
  allMedicos: Medico[] = []; // Lista completa de médicos
  filteredMedicos: Medico[] = []; // Lista filtrada de médicos

  constructor(
    private dialog: MatDialog,
    private medicoService: MedicoService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<Medico>([]);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.applyPagination();
  }

  ngAfterViewInit(): void {
    this.tableData();
  }

  tableData() {
    this.medicoService.getListaMedicos().subscribe(
      (response: Medico[]) => {
        this.allMedicos = response; // Guardar la lista completa de médicos
        this.filteredMedicos = response; // Inicialmente, no hay filtro aplicado
        this.totalItems = response.length; // Asignar el total de elementos
        this.applyPagination(); // Aplicar paginación inicialmente
      },
      (error: any) => {
        this.responseMessage =
          error.error?.message || GlobalConstants.genericError;
      }
    );
  }

  applyPagination() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const paginatedData = this.filteredMedicos.slice(startIndex, endIndex);
    this.dataSource = new MatTableDataSource<Medico>(paginatedData);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredMedicos = this.allMedicos.filter(medico => {
      const telefono = Array.isArray(medico.telefonoMedico)
        ? medico.telefonoMedico.join(', ')
        : medico.telefonoMedico.toString();
      return (
        medico.nombreMedico.toLowerCase().includes(filterValue) ||
        telefono.includes(filterValue) ||
        medico.edadMedico.toString().includes(filterValue) ||
        medico.especialidadNombre.toLowerCase().includes(filterValue)
      );
    });
    this.totalItems = this.filteredMedicos.length;
    this.pageIndex = 0; // Reiniciar a la primera página al aplicar un filtro
    this.applyPagination();
  }

  handleAddAction() {
    const dialogRef = this.dialog.open(AddEddMedicoComponent, {
      data: {
        action: 'Add',
      },
    });
    dialogRef.componentInstance.onAddMedico.subscribe(() => {
      this.tableData();
    });
  }

  handleEditAction(medico: Medico) {
    const dialogRef = this.dialog.open(AddEddMedicoComponent, {
      data: {
        action: 'Edit',
        data: medico,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tableData();
      }
    });
  }

  handleDeleteAction(medico: Medico) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        message: `¿Estás seguro que deseas eliminar al médico ${medico.nombreMedico}?`,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteMedico(medico.idMedico);
      }
    });
  }

  deleteMedico(id: number) {
    this.medicoService.delete(id).subscribe(
      (response: any) => {
        this.tableData();
        this.reloadPage();
      },
      (error: any) => {
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  } 
}
