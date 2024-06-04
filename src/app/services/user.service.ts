import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  signup(data: any) {
    return this.httpClient.post(this.url + '/user/signup', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  login(data: any) {
    return this.httpClient.post(this.url + '/user/login', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  changePassword(data: any) {
    return this.httpClient.post(this.url + '/user/changePassword/', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getListaUsuarios(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.httpClient.get(this.url + '/user/get', { headers });
  }
  getAdmin(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.httpClient.get(this.url + '/user/getAdmin', { headers });
  }

  private getToken(): string {
    // Implementa este método para obtener el token de autenticación desde el almacenamiento local o el servicio de autenticación
    return localStorage.getItem('authToken') || '';
  }

  update(data: any) {
    return this.httpClient.post(this.url + '/user/update', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  updateUserStatus(userId: number, checked: boolean): Observable<any> {
    const request = {
      id: userId,
      estado: checked, // Supongo que el estado se representa como un booleano en el backend
    };
    return this.httpClient.post(
      'http://localhost:8081/user/updateEstado',
      request
    );
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(this.url + '/user/delete/' + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
