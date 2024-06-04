import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getEspecialidad(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.httpClient.get(this.url + "/especialidad/get", { headers });
  }

  private getToken(): string {
    // Implementa este método para obtener el token de autenticación desde el almacenamiento local o el servicio de autenticación
    return localStorage.getItem('authToken') || '';
  }
}
