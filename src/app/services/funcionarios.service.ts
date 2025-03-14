// src/app/services/funcionarios.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  private apiUrl = 'http://localhost:8000/funcionarios'; // Ajuste conforme seu backend

  constructor(private http: HttpClient) { }

  getFuncionariosComDiarias(data: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?data=${data}`);
  }
  marcarDiaria(funcionarioId: number, data: string): Observable<any> {
    const body = { funcionarioId, data }; // Dados para enviar
    return this.http.post(`${this.apiUrl}/diarias/criar`, body);  // Corrigido a sintaxe aqui
  }
}
