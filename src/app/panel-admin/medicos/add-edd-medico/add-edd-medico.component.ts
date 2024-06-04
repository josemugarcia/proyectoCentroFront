import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicoService } from '../../../services/medico.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { GlobalConstants } from '../../../shared/globalsConstants';

@Component({
  selector: 'app-add-edd-medico',
  templateUrl: './add-edd-medico.component.html',
  styleUrls: ['./add-edd-medico.component.css'],
})
export class AddEddMedicoComponent implements OnInit {
  onAddMedico = new EventEmitter();
  onEditMedico = new EventEmitter();
  medicoForm: FormGroup;
  dialogAction: string = ''; 
  action: string = 'Añadir';
  responseMessage: string = '';
  especialidades: any = [];

  errorMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private medicoService: MedicoService,
    public dialogRef: MatDialogRef<AddEddMedicoComponent>,
    private especialidadService: EspecialidadService
  ) {
    this.medicoForm = this.formBuilder.group({
      nombreMedico: [null, [Validators.required, Validators.pattern(GlobalConstants.nombreMedico)]],
      especialidadId: [null, [Validators.required]],
      telefonoMedico: [null, [Validators.required, Validators.pattern(GlobalConstants.telefono)]],
      edadMedico: [null, [Validators.required, Validators.pattern(GlobalConstants.edadMedico)]],
      imagenMedico: [null, [Validators.required]],
      idMedico: [null] // Asegúrate de que el campo idMedico está aquí
    });
  }

  ngOnInit(): void {
    if (this.dialogData) {
      this.dialogAction = this.dialogData.action;
      if (this.dialogAction === 'Edit') {
        this.action = 'Update';
        this.medicoForm.patchValue(this.dialogData.data);
      }
    }
    this.getEspecialidades();
  }

  getEspecialidades() {
    this.especialidadService.getEspecialidad().subscribe(
      (response: any) => {
        this.especialidades = response;
      },
      (error: any) => {
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
      }
    );
  }

  handleSubmit() {
    if (this.medicoForm.invalid) {
      this.medicoForm.markAllAsTouched();
      return;
    }

    if (this.dialogAction === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    const formData = this.medicoForm.value;
  
    const data = {
      nombreMedico: formData.nombreMedico,
      especialidadId: formData.especialidadId,
      telefonoMedico: formData.telefonoMedico,
      edadMedico: formData.edadMedico,
      imagenMedico: formData.imagenMedico // Podrías necesitar convertir esto a una URL o un formato adecuado
    };
  
    this.medicoService.add(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onAddMedico.emit();
        this.responseMessage = response.message;
        this.reloadPage();
      },
      (error) => {
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
      
        if (error.status === 409) {
          this.errorMessage = 'El médico con este nombre ya existe.';
        }
      }
    );
  }
  

  edit() {
    if (this.medicoForm.invalid) {
      this.medicoForm.markAllAsTouched();
      return;
    }
  
    const formData = this.medicoForm.value;
  
    // Busca la especialidad por su ID en lugar de su nombre
    const especialidad = this.especialidades.find((esp: any) => esp.id === formData.especialidadId);
  
    if (!formData.idMedico) {
      console.error('El ID del médico no está definido.');
      return;
    }
  
    const data = {
      idMedico: formData.idMedico,
      nombreMedico: formData.nombreMedico,
      especialidadId: especialidad.id, // Aquí se pasa el ID de la especialidad
      telefonoMedico: formData.telefonoMedico,
      edadMedico: formData.edadMedico,
      imagenMedico: formData.imagenMedico
    };
  
    this.medicoService.update(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onEditMedico.emit();
        this.responseMessage = response.message;
        this.reloadPage();
        
      },
      (error) => {
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        if (error.status === 400) {
          this.errorMessage = 'El médico con este nombre ya existe.';
        }
      }
    );
  }
  
  
  


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.medicoForm.patchValue({
        imagenMedico: file.name,
      });
      this.medicoForm.get('imagenMedico')?.updateValueAndValidity();
    }
  }

  reloadPage() {
    window.location.reload();
  } 
}
