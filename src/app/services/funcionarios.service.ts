// src/app/services/funcionarios.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {
 // Ajuste conforme seu backend
  private apiFuncionarios = `${environment.apiUrl}/funcionarios`;
  constructor(private http: HttpClient) { }

  getFuncionariosComDiarias(data: string): Observable<any> {
    return this.http.get(`${this.apiFuncionarios}?data=${data}`);
  }
  marcarDiaria(funcionarioId: number, data: string): Observable<any> {
    const body = { funcionarioId, data }; // Dados para enviar
    return this.http.post(`${this.apiFuncionarios}/diarias/criar`, body);  // Corrigido a sintaxe aqui
  }
}
