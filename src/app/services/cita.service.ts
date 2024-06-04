import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  apiUrl = environment.apiUrl; // Obtiene la URL de la API del archivo de entorno
  citasEndpoint = 'cita/add'; // Endpoint para agregar una nueva cita

  constructor(private httpClient: HttpClient) {}

  addNewCita(data: any) {
    console.log('Datos de la cita que se enviarán al servidor:', data); // Imprime los datos antes de enviarlos al servidor
    const url = `${this.apiUrl}/${this.citasEndpoint}`; // Concatena la URL base con el endpoint de las citas
    return this.httpClient.post(url, data); // Realiza la solicitud POST a la URL completa
  }
  getCitasRegistradas(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.httpClient
      .get(this.apiUrl + '/cita/get', { headers, responseType: 'text' })
      .pipe(
        map((response) => {
          try {
            return JSON.parse(response);
          } catch (e) {
            throw new Error('Invalid JSON format');
          }
        }),
        catchError(this.handleError)
      );
  }
  private handleError(error: any): Observable<never> {
    console.error('Error al obtener citas:', error);
    return throwError(() => new Error('Error al obtener citas.'));
  }

  private getToken(): string {
    return localStorage.getItem('authToken') || '';
  }

  delete(idCita: any): Observable<any> {
    return this.httpClient.delete(this.apiUrl + '/cita/delete/' + idCita, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getCitasByUsuario(usuario_id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.httpClient.get(`${this.apiUrl}/cita/getCitasByUsuario/${usuario_id}`, { headers });
  }
}
