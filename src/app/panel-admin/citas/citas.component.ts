import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CitaService } from '../../services/cita.service';
import { GlobalConstants } from '../../shared/globalsConstants';
import { DeleteCitaConfirmationComponent } from './delete-cita-confirmation/delete-cita-confirmation.component';

interface Cita {
  fecha: string;
  hora: string;
  especialidad_nombre: string;
  medico_nombre: string;
  usuario_nombre: string;
  id: number;
}

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'fecha',
    'hora',
    'especialidad_nombre',
    'medico_nombre',
    'usuario_nombre',
    'edit',
  ];
  dataSource: MatTableDataSource<Cita>;
  responseMessage: any;
  pageSizeOptions: number[] = [5, 10, 25];
  pageSize: number = 5;
  pageIndex: number = 0;
  totalItems: number = 0;
  allCitas: Cita[] = [];
  filteredCitas: Cita[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private citaService: CitaService
  ) {
    this.dataSource = new MatTableDataSource<Cita>([]);
  }

  ngAfterViewInit(): void {
    this.tableData();
  }

  tableData() {
    this.citaService.getCitasRegistradas().subscribe(
      (response: Cita[]) => {
        console.log('Datos de citas recibidos:', response); // Ver los datos recibidos
        this.allCitas = response;
        this.filteredCitas = response;
        this.totalItems = response.length;
        this.applyPagination();
      },
      (error: any) => {
        console.error('Error al obtener citas:', error); // Ver el error
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
      }
    );
  }

  applyPagination() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const paginatedData = this.filteredCitas.slice(startIndex, endIndex);
    this.dataSource = new MatTableDataSource<Cita>(paginatedData);
    this.dataSource.paginator = this.paginator;
    console.log('Datos paginados:', paginatedData); // Ver los datos paginados
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.applyPagination();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredCitas = this.allCitas.filter(cita => {
      return (
        (cita.fecha?.toLowerCase() || '').includes(filterValue) ||
        (cita.hora || '').includes(filterValue) ||
        (cita.especialidad_nombre?.toLowerCase() || '').includes(filterValue) ||
        (cita.medico_nombre?.toLowerCase() || '').includes(filterValue) ||
        (cita.usuario_nombre?.toLowerCase() || '').includes(filterValue)
      );
    });
    
    
    this.totalItems = this.filteredCitas.length;
    this.pageIndex = 0;
    this.applyPagination();
  }

  handleDeleteAction(cita: any) {
    const dialogRef = this.dialog.open(DeleteCitaConfirmationComponent, {
      data: {
        message: `¿Estás seguro que deseas eliminar La cita ?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCita(cita.idCita);
        this.reloadPage();
      }
    });
  }

  deleteCita(idCita: number) {
    this.citaService.delete(idCita).subscribe(
      (response: any) => {
        this.tableData();
      },
      (error: any) => {
        this.responseMessage =
          error.error?.message || GlobalConstants.genericError;
      }
    );
  }

  
  reloadPage() {
    window.location.reload();
  } 
}
