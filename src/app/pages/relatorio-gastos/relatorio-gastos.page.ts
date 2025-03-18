import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonList, IonLabel, IonIcon, IonButton, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-relatorio-gastos',
  templateUrl: './relatorio-gastos.page.html',
  styleUrls: ['./relatorio-gastos.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonButton, IonIcon, IonLabel, IonList, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RelatorioGastosPage implements OnInit {
[x: string]: any;
relatorio: any = {};
totalGasto: number = 0;
  data_fechamento: string = '';
  url:any;
  quinzenas = []; // Lista de quinzenas que você pode carregar via API ou inicializar manualmente
  id_quinzena: number | undefined;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    moment.tz.setDefault('America/Sao_Paulo');
    const today = moment().tz('America/Sao_Paulo');
    this.data_fechamento = today.format('YYYY-MM-DD').toString().split('T')[0];
    this.url = environment.apiUrl;
    this.carregarRelatorio();


  }


  // No seu arquivo TypeScript para o frontend
carregarRelatorio() {
  const dataFechamento = this.data_fechamento;  // Obtendo a data de fechamento

  if (dataFechamento) {
    this.http.get(`${environment.apiUrl}/gastos/quinzena/relatorio?data_fechamento=${dataFechamento}`).subscribe(
      (response: any) => {
        // Certifique-se de que os valores sejam números
        this.relatorio = {
          gastos: response.gastos.map((gasto: any) => ({
            ...gasto,
            valor: parseFloat(gasto.valor) // Converte o valor para número
          })),
          total_gasto: parseFloat(response.total_gasto) // Converte o total para número
        };
        this.totalGasto = this.relatorio.total_gasto;
      },
      (error) => {
        console.error('Erro ao carregar relatório:', error);
      }
    );
  } else {
    console.error('Data de fechamento não informada');
  }
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
}
