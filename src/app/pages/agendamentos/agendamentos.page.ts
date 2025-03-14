import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonList, IonItem, IonLabel, IonInput, IonDatetime } from '@ionic/angular/standalone';

import { Router } from '@angular/router';
@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.page.html',
  styleUrls: ['./agendamentos.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonList, IonItem, IonLabel, IonInput, IonDatetime ,CommonModule, FormsModule]
})
export class AgendamentosPage implements OnInit {
  agendamentos: { data: string, valor: number }[] = [];
  data: string = '';
  valor: number = 0;
  totalGanhos: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.totalGanhos = this.calcularGanhos();

  }
  adicionarAgendamento() {
    if (this.data && this.valor > 0) {
      this.agendamentos.push({ data: this.data, valor: this.valor });
      this.data = '';  // Limpar campo de data após adicionar
      this.valor = 0;  // Limpar campo de valor após adicionar

      // Recalcular o total de ganhos
      this.totalGanhos = this.calcularGanhos();
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  // Função para calcular os ganhos totais
  calcularGanhos() {
    return this.agendamentos.reduce((total, agendamento) => total + agendamento.valor, 0);
  }
}
