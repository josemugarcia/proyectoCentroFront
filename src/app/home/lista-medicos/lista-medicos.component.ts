import { Component } from '@angular/core';
import { MedicoService } from '../../services/medico.service';

@Component({
  selector: 'app-lista-medicos',
  templateUrl: './lista-medicos.component.html',
  styleUrl: './lista-medicos.component.css'
})
export class ListaMedicosComponent {
  dataSource: any[] = [];
  baseImagePath: string = 'assets/medicos/';
  

  constructor(private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.medicoService.getListaMedicos().subscribe(
      (data: any[]) => {
        console.log(data); // Verifica los datos recibidos
        // Ajusta la URL de las imágenes aquí
        this.dataSource = data.map(medico => {
          return {
            ...medico,
            image: `${this.baseImagePath}${medico.imagenMedico}`
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
