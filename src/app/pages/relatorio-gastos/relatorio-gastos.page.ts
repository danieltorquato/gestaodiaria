import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonList, IonLabel, IonIcon, IonButton, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonBackButton, IonButtons, IonAccordionGroup, IonAccordion } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-relatorio-gastos',
  templateUrl: './relatorio-gastos.page.html',
  styleUrls: ['./relatorio-gastos.page.scss'],
  standalone: true,
  imports: [IonAccordion, IonAccordionGroup, IonButtons, IonBackButton, IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonButton, IonIcon, IonLabel, IonList, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RelatorioGastosPage implements OnInit {
[x: string]: any;
quinzenas: any[] = [];
relatorios: any[] = [];

totalGasto: number = 0;
  data_fechamento: string = '';
  url:any;

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

    this.listarQuinzenas();

  }


  carregarRelatorio(dataFechamento: string, index: number) {
    this.http.get(`${environment.apiUrl}/gastos/quinzena/relatorio?data_fechamento=${dataFechamento}`).subscribe(
      (response: any) => {
        this.relatorios[index] = {
          gastos: response.gastos.map((gasto: any) => ({
            ...gasto,
            valor: parseFloat(gasto.valor), // Converter valor para número
            data: new Date(gasto.data).toLocaleDateString('pt-BR') // Converter data para formato BR
          })),
          totalGasto: parseFloat(response.total_gasto)
        };
        console.log('Relatório carregado:', response);
      },
      (error) => {
        console.error('Erro ao carregar relatório:', error);
      }
    );
  }



  listarQuinzenas() {
    this.http.get(`${environment.apiUrl}/gastos/quinzena/listar`).subscribe(
      (response: any) => {
        this.quinzenas = response;
        console.log('Quinzenas carregadas:', response);
      },
      (error) => {
        console.error('Erro ao carregar quinzenas:', error);
      }
    );
  }

formatarDataBR(data: string): string {
  const dataObj = new Date(data);  // Converte a string de data para um objeto Date
  const dia = String(dataObj.getDate()).padStart(2, '0');  // Obtém o dia e garante que tenha dois dígitos
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0');  // Obtém o mês e garante que tenha dois dígitos
  const ano = dataObj.getFullYear();  // Obtém o ano completo

  return `${dia}/${mes}/${ano}`;  // Retorna a data no formato DD/MM/AAAA
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
