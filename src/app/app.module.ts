import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Combina FormsModule y ReactiveFormsModule
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { HomeComponent } from './home/home.component';
import { InicioComponent } from './home/inicio/inicio.component';
import { BlogComponent } from './home/blog/blog.component';
import { EspecialidadesComponent } from './home/especialidades/especialidades.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';
import { DashboardComponent } from './panel-admin/dashboard/dashboard.component';
import { MedicosComponent } from './panel-admin/medicos/medicos.component';
import { AddEddMedicoComponent } from './panel-admin/medicos/add-edd-medico/add-edd-medico.component';
import { ListaMedicosComponent } from './home/lista-medicos/lista-medicos.component';
import { ReservarCitaComponent } from './home/reservar-cita/reservar-cita.component';

import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog'; // Importa MatDialogModule
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgToastModule } from 'ng-angular-popup';
import { DeleteConfirmationComponent } from './panel-admin/medicos/delete-confirmation/delete-confirmation.component';
import { UsersComponent } from './panel-admin/users/users.component';
import { EddUserComponent } from './panel-admin/users/edd-user/edd-user.component';
import { DeleteConfirmationUserComponent } from './panel-admin/users/delete-confirmation-user/delete-confirmation-user.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmPasswordDialogComponent } from './panel-admin/users/confirm-password-dialog/confirm-password-dialog.component';
import { CitasComponent } from './panel-admin/citas/citas.component';
import { DeleteCitaConfirmationComponent } from './panel-admin/citas/delete-cita-confirmation/delete-cita-confirmation.component';
import { CitasUsuarioComponent } from './home/citas-usuario/citas-usuario.component';
import { ConfirmDialogComponent } from './home/citas-usuario/confirm-dialog/confirm-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    HomeComponent,
    InicioComponent,
    BlogComponent,
    EspecialidadesComponent,
    PanelAdminComponent,
    DashboardComponent,
    MedicosComponent,
    AddEddMedicoComponent,
    ListaMedicosComponent,
    ReservarCitaComponent,
    DeleteConfirmationComponent,
    UsersComponent,
    EddUserComponent,
    DeleteConfirmationUserComponent,
    ConfirmPasswordDialogComponent,
    CitasComponent,
    DeleteCitaConfirmationComponent,
    CitasUsuarioComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgToastModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatTableModule,
    MatToolbarModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatPaginatorModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true, firstDayOfWeek: 1 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
