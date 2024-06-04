import { Component, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { GlobalConstants } from '../../shared/globalsConstants';
import { MatTableDataSource } from '@angular/material/table';
import { EddUserComponent } from './edd-user/edd-user.component';
import { DeleteConfirmationComponent } from '../medicos/delete-confirmation/delete-confirmation.component';
import { ConfirmPasswordDialogComponent } from './confirm-password-dialog/confirm-password-dialog.component';
import { PageEvent } from '@angular/material/paginator';

interface User {
  nombre: string;
  telefono: string | string[] | number;
  email: string;
  estado: boolean;
  id: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'nombre',
    'email',
    'telefono',
    'estado',
    'password',
    'edit',
  ];
  dataSource: MatTableDataSource<User>;
  responseMessage: any;
  showPassword: boolean = false;
  pageSizeOptions: number[] = [5, 10, 25];

  pageSize: number = 5;
  pageIndex: number = 0;
  totalItems: number = 0;
  allUsers: User[] = []; // Lista completa de usuarios
  filteredUsers: User[] = []; // Lista filtrada de usuarios

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<User>([]);
  }

  ngAfterViewInit(): void {
    this.tableData();
  }

  tableData() {
    this.userService.getListaUsuarios().subscribe(
      (response: User[]) => {
        this.allUsers = response; // Guardar la lista completa de usuarios
        this.filteredUsers = response; // Inicialmente, no hay filtro aplicado
        this.totalItems = response.length; // Asignar el total de elementos
        this.applyPagination(); // Aplicar paginación inicialmente
      },
      (error: any) => {
        this.responseMessage =
          error.error?.message || GlobalConstants.genericError;
      }
    );
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.applyPagination();
  }

  applyPagination() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const paginatedData = this.filteredUsers.slice(startIndex, endIndex);
    this.dataSource = new MatTableDataSource<User>(paginatedData);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredUsers = this.allUsers.filter(user => {
      const nombre = user.nombre ? user.nombre.toLowerCase() : '';
      const telefono = user.telefono != null ? (Array.isArray(user.telefono) ? user.telefono.join(', ').toLowerCase() : user.telefono.toString().toLowerCase()) : '';
      const email = user.email ? user.email.toLowerCase() : '';
  
      return (
        nombre.includes(filterValue) ||
        telefono.includes(filterValue) ||
        email.includes(filterValue)
      );
    });
    this.totalItems = this.filteredUsers.length;
    this.pageIndex = 0; // Reiniciar a la primera página al aplicar un filtro
    this.applyPagination();
  }
  
  

  handleEditAction(usuario: any) {
    const dialogRef = this.dialog.open(ConfirmPasswordDialogComponent, {
      width: '300px',
      data: { usuario },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Password is confirmed, proceed with edit
        const editDialogRef = this.dialog.open(EddUserComponent, {
          data: {
            action: 'Edit',
            data: usuario,
          },
        });

        editDialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.tableData();
          }
        });
      }
    });
  }

  handleDeleteAction(usuario: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        message: `¿Estás seguro que deseas eliminar al usuario ${usuario.nombre}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(usuario.id);
      }
    });
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(
      (response: any) => {
        this.tableData();
        this.reloadPage();
      },
      (error: any) => {
        this.responseMessage =
          error.error?.message || GlobalConstants.genericError;
      }
    );
  }

  onChange(checked: boolean, userId: number): void {
    this.userService.updateUserStatus(userId, checked).subscribe(
      (response) => {
        console.log('Estado actualizado correctamente', response);
      },
      (error) => {
        console.error('Error al actualizar el estado', error);
      }
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  reloadPage() {
    window.location.reload();
  }
}
