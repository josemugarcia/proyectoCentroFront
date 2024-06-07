import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { EspecialidadService } from '../../services/especialidad.service';
import { MedicoService } from '../../services/medico.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-reservar-cita',
  templateUrl: './reservar-cita.component.html',
  styleUrls: ['./reservar-cita.component.css']
})
export class ReservarCitaComponent implements OnInit {
  especialidades: any[] = [];
  medicos: any[] = [];
  medicosFiltrados: any[] = [];
  horasDisponibles: string[] = [];
  citasRegistradas: any[] = [];
  
  cita = {
    especialidad_id: 0,
    medico_id: 0,
    usuario_id: null as number | null,
    fecha: '',
    hora: ''
  };
  minDate: Date = new Date();
  fechaMinima: Date;
  fechaMaxima: Date;
  horaSeleccionada: string = "12:30:00";
  fechaSeleccionada: string = "2024-05-25";

  diasSemana: any[] = [
    { nombre: 'Lunes - Jueves', horas: this.generarHoras(8, 21) },
    { nombre: 'Viernes', horas: this.generarHoras(8, 18) },
    { nombre: 'Sábado', horas: this.generarHoras(8, 15) },
  ];

  constructor(
    private citaService: CitaService,
    private especialidadService: EspecialidadService,
    private medicoService: MedicoService,
    private authService: AuthService,
    private router: Router,
    private spinnerService: SpinnerService,
    private toast: NgToastService,
  ) {
    this.fechaMinima = new Date();
    this.fechaMaxima = this.calcularFechaMaxima(this.fechaMinima, 30);
  }

  ngOnInit(): void {
    this.obtenerCitasRegistradas();
    if (this.authService.isAuthenticated()) {
      this.loadEspecialidades();
      this.loadMedicos();
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadEspecialidades() {
    this.especialidadService.getEspecialidad().subscribe(
      (data: any) => {
        this.especialidades = data;
      },
      (error: any) => {
        console.error('Error al cargar especialidades', error);
      }
    );
  }

  loadMedicos(especialidadId: string = '') {
    const id = parseInt(especialidadId);
    if (isNaN(id)) {
      this.medicos = [];
      this.medicosFiltrados = [];
      return;
    }

    this.medicoService.getByEspecialidad(id).subscribe(
      (data: any) => {
        this.medicos = data;
        this.filtrarMedicosPorEspecialidad(especialidadId);
      },
      (error: any) => {
        console.error('Error al cargar médicos', error);
      }
    );
  }

  onSubmit() {
    const idUsuario = this.authService.getIdUsuario();
    if (idUsuario !== null) {
      this.cita.usuario_id = idUsuario;
      const selectedDate = this.parseDate(this.cita.fecha);
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();
      this.cita.fecha = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
      this.citaService.addNewCita(this.cita).subscribe(
        (response: any) => {
          console.log('Cita registrada exitosamente', response);
          this.router.navigate(['/home/inicio']);
          this.toast.success({
            detail: 'Cita Reservada con Éxito!!',
            summary: response.message,
            duration: 5000
          });
        },
        (error: any) => {
          console.error('Error registrando la cita', error);
          if (error.status === 409) { // Si el error es 409
            this.toast.error({
              detail: 'La fecha no está disponible.',
              summary: 'Error al reservar cita',
              duration: 5000
            });
          } else {
            this.toast.error({
              detail: 'Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.',
              summary: 'Error al reservar cita',
              duration: 5000
            });
          }
        }
      );
    } else {
      console.error('No se pudo obtener el ID del usuario.');
    }
  }
  

  openSpinner() {
    this.spinnerService.open();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }

  onEspecialidadChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const especialidadId = parseInt(target.value);
    this.cita.especialidad_id = especialidadId;
    this.loadMedicos(especialidadId.toString());
    this.cita.medico_id = 0;
    this.filtrarHorasDisponibles(); 
  }

  filtrarMedicosPorEspecialidad(especialidadId: string) {
    if (especialidadId) {
      this.medicosFiltrados = this.medicos.filter(medico => medico.especialidadId === parseInt(especialidadId));
    } else {
      this.medicosFiltrados = [];
    }
  }

  isFormValid(): boolean {
    return this.cita.especialidad_id !== 0 && this.cita.medico_id !== 0 && this.cita.fecha !== '' && this.cita.hora !== '';
  }

  generarHoras(horaInicio: number, horaFin: number): string[] {
    const horas: string[] = [];
    for (let hora = horaInicio; hora <= horaFin; hora++) {
      horas.push(`${hora.toString().padStart(2, '0')}:00`);
    }
    return horas;
  }

  parseDate(dateString: string): Date {
    return new Date(dateString);
  }

  calcularFechaMaxima(fecha: Date, dias: number): Date {
    const fechaMax = new Date(fecha);
    fechaMax.setDate(fechaMax.getDate() + dias);
    return fechaMax;
  }

  obtenerCitasRegistradas() {
    this.citaService.getCitasRegistradas().subscribe(
      (data: any[]) => {
        this.citasRegistradas = data;
        console.log('Lista de citas registradas:', this.citasRegistradas);
        this.filtrarHorasDisponibles();
      },
      (error: any) => {
        console.error('Error al obtener las citas registradas', error);
      }
    );
  }

  filtrarHorasDisponibles() {
    const horasTotales = this.diasSemana
        .find(dia => this.parseDate(this.cita.fecha).getDay() === dia.diaSemana)
        ?.horas;

    if (!horasTotales) {
        this.horasDisponibles = [];
        return;
    }

    this.horasDisponibles = horasTotales.filter((hora: any) => {
        return !this.citasRegistradas.some(cita => {
            return cita.fecha === this.cita.fecha &&
                   cita.hora === hora &&
                   cita.medico.idMedico === this.cita.medico_id &&
                   cita.usuario.id === this.cita.usuario_id;
        });
    });
}

  
}
