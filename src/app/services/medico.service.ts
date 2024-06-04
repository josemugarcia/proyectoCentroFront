import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  add(data: any): Observable<any> {
    return this.httpClient.post(`${this.url}/medico/add`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getListaMedicos(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.httpClient.get(this.url + "/medico/get", { headers });
  }

  update(data: any): Observable<any> {
    console.log('Datos enviados al backend:', data);
    // Corrige el encabezado Content-Type a 'application/json'
    return this.httpClient.post(this.url + "/medico/update", data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  private getToken(): string {
    // Implementa este método para obtener el token de autenticación desde el almacenamiento local o el servicio de autenticación
    return localStorage.getItem('authToken') || '';
  }

  getByEspecialidad(idEspecialidad: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.httpClient.get(`${this.url}/medico/getByEspecialidad/${idEspecialidad}`, { headers });
  }

  updateStatus(data: any): Observable<any> {
    return this.httpClient.post(this.url + "/medico/updateStatus", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(this.url + "/medico/delete/" + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
