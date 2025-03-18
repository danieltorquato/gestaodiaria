import { IonButton, IonHeader, IonLabel, IonDatetime, IonItem, IonCardContent, IonInput, IonCardHeader, IonCardTitle, IonCard, IonContent, IonTitle, IonBackButton, IonButtons, IonToolbar, IonList, IonIcon } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inserir-gasto',
  templateUrl: './inserir-gasto.page.html',
  styleUrls: ['./inserir-gasto.page.scss'],
  standalone: true,
  imports: [IonIcon, IonList, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardTitle, IonCardHeader, IonInput, IonCardContent, IonItem, IonDatetime, IonLabel, IonHeader, IonButton, FormsModule, CommonModule ],
})
export class InserirGastoPage implements OnInit {
  categoria: string = '';
  valor: number | null = null;
  data: string = "";
  gastos: any[] = [];
url: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.url = environment.apiUrl;
     moment.tz.setDefault('America/Sao_Paulo');
        const today = moment().tz('America/Sao_Paulo');
        this.data = today.format('YYYY-MM-DD').toString().split('T')[0];
    // Obtém a categoria passada pela navegação
    this.categoria = this.route.snapshot.paramMap.get('categoria') || '';
    this.carregarGastos();
  }

  // Salva o gasto no backend
  salvarGasto() {
    const gasto = {
      categoria: this.categoria,
      valor: this.valor,
      data: this.data,
    };

    this.http.post(`${this.url}/gastos/adicionar`, gasto).subscribe(
      (response) => {
        console.log('Gasto salvo:', response);
        this.router.navigate(['/gastos']); // Volta para a tela de gastos
      },
      (error) => {
        console.error('Erro ao salvar gasto:', error);
      }
    );
  }
  toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }
  // Carrega a lista de gastos
  carregarGastos() {
    this.http.get(`${this.url}/gastos/listar`).subscribe(
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
}
