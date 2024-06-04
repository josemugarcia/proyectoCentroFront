import { Component, OnInit } from '@angular/core';
import { EspecialidadService } from '../../services/especialidad.service';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent implements OnInit {
  dataSource: any[] = [];
  baseImagePath: string = 'assets/especialidades/';
  

  constructor(private especialidadService: EspecialidadService) {}

  ngOnInit(): void {
    this.especialidadService.getEspecialidad().subscribe(
      (data: any[]) => {
        console.log(data); // Verifica los datos recibidos
        // Ajusta la URL de las imágenes aquí
        this.dataSource = data.map(especialidad => {
          return {
            ...especialidad,
            image: `${this.baseImagePath}${especialidad.imagenEspecialidad}`
          };
        });
        console.log(this.dataSource); // Verifica los datos después de mapear
      },
      (error: any) => {
        console.error('Error fetching especialidades', error);
      }
    );
  }
}
