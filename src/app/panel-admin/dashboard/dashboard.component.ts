import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico.service';
import { UserService } from '../../services/user.service';
import { EspecialidadService } from '../../services/especialidad.service';
import { CitaService } from '../../services/cita.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../../shared/globalsConstants';

interface User {
  nombre: string;
  telefono: string | string[] | number;
  email: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  medicosCount: number = 0;
  usersCount: number = 0;
  especialidadesCount: number = 0;
  citasCount: number = 0;
  displayedColumns: string[] = ['nombre', 'email', 'telefono'];
  dataSource!: MatTableDataSource<User>;
  responseMessage: any;
  allUsers: User[] = [];

  constructor(
    private userService: UserService,
    private medicoService: MedicoService,
    private especialidadService: EspecialidadService,
    private citaService: CitaService
  ) {
    this.dataSource = new MatTableDataSource<User>([]);
  }

  ngOnInit(): void {
    this.medicoService.getListaMedicos().subscribe(medicos => this.medicosCount = medicos.length);
    this.userService.getListaUsuarios().subscribe(usuarios => this.usersCount = usuarios.length);
    this.especialidadService.getEspecialidad().subscribe(especialidades => this.especialidadesCount = especialidades.length);
    this.citaService.getCitasRegistradas().subscribe(citas => this.citasCount = citas.length);
    this.tableData();
  }

  tableData() {
    this.userService.getListaUsuarios().subscribe(
      (response: User[]) => {
        this.allUsers = response;
        this.dataSource.data = this.getUltimos5Registros(this.allUsers);
      },
      (error: any) => {
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
      }
    );
  }

  getUltimos5Registros(users: User[]): User[] {
    return users.slice(-5).reverse(); // Obtener los últimos 5 usuarios y revertir el orden
  }
}
