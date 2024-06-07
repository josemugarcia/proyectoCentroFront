import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { HomeComponent } from './home/home.component';
import { InicioComponent } from './home/inicio/inicio.component';
import { BlogComponent } from './home/blog/blog.component';
import { AuthGuard } from './auth.guard';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';
import { DashboardComponent } from './panel-admin/dashboard/dashboard.component';
import { MedicosComponent } from './panel-admin/medicos/medicos.component';
import { EspecialidadesComponent } from './home/especialidades/especialidades.component';
import { ListaMedicosComponent } from './home/lista-medicos/lista-medicos.component';
import { ReservarCitaComponent } from './home/reservar-cita/reservar-cita.component';
import { UsersComponent } from './panel-admin/users/users.component';
import { CitasComponent } from './panel-admin/citas/citas.component';
import { CitasUsuarioComponent } from './home/citas-usuario/citas-usuario.component';
import { FaqComponent } from './home/faq/faq.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro_usuario', component: RegistroUsuarioComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user'] },
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'especialidad', component: EspecialidadesComponent },
      { path: 'lista_medicos', component: ListaMedicosComponent },
      { path: 'reservar_cita', component: ReservarCitaComponent },
      { path: 'citas_usuario', component: CitasUsuarioComponent },
      { path: 'faq', component: FaqComponent },
    ],
  },
  {
    path: 'panel_admin',
    component: PanelAdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'medicos', component: MedicosComponent },
      { path: 'users', component: UsersComponent },
      { path: 'citas', component: CitasComponent },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
