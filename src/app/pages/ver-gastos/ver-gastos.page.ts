import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonList, IonLabel, IonIcon, IonButton, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-gastos',
  templateUrl: './ver-gastos.page.html',
  styleUrls: ['./ver-gastos.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonButton, IonIcon, IonLabel, IonList, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class VerGastosPage implements OnInit {
  categoria: string = '';
  valor: number | null = null;
  data: string = new Date().toISOString();
  gastos: any[] = [];
  data_fechamento: string = '';
  constructor( private http: HttpClient,     private router: Router,) { }

  ngOnInit() {
    this.carregarGastos();
  }
 // Carrega a lista de gastos
 carregarGastos() {
  this.http.get('http://localhost:8000/gastos/listar').subscribe(
    (response: any) => {
      this.gastos = response;
    },
    (error) => {
      console.error('Erro ao carregar gastos:', error);
    }
  );
}
// Method to get the icon based on the category
getIcone(categoria: string): string {
  const icones: { [key: string]: string } = {
    gasolina: 'car',
    alimentação: 'restaurant',
    pedagio: 'card',
    estacionamento: 'pin',
    outros: 'cash'
  };
  return icones[categoria] || 'cash';
}
fecharQuinzena() {
  const dataFechamento = new Date().toISOString().split('T')[0]; // Data atual
  this.http.post('http://localhost:8000/gastos/quinzena/fechar', { data_fechamento: dataFechamento }).subscribe(
    (response) => {
      console.log('Quinzena fechada:', response);
this.router.navigate(['/relatorio-gastos']);
    },
    (error) => {
      console.error('Erro ao fechar quinzena:', error);
    }
  );
}
}
