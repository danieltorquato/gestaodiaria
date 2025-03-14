import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonThumbnail, IonHeader, IonList, IonItem, IonLabel, IonCol, IonRow, IonText, IonAvatar, IonDatetime, IonIcon, IonDatetimeButton, IonModal, IonCheckbox } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FuncionariosService } from '../services/funcionarios.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonCheckbox, IonDatetime,  IonText, IonRow, IonCol, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonText, IonCardContent, CommonModule, IonDatetime, IonDatetime, IonDatetimeButton, IonModal, IonCheckbox, FormsModule],
})
export class HomePage implements OnInit {
  selectedDate: string = ""; // Variável para armazenar a data selecionada
  funcionarios: any[] = [];
  constructor(private router: Router, private funcionariosService: FuncionariosService, private http: HttpClient) { }

  // Removed the http property declaration

  ngOnInit() {
    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0]; // Pega a parte da data sem a hora
    this.funcionariosService.getFuncionariosComDiarias(this.selectedDate).subscribe(data => {
      this.funcionarios = data;
    }, error => {
      console.error('Erro ao carregar funcionários', error);
    });
  }


  // Método para buscar os funcionários por data
 // Método para buscar os funcionários por data e definir o estado do checkbox
buscarPorData() {
  if (this.selectedDate) {
    const dateOnly = this.selectedDate.split('T')[0];
    const apiUrl = `http://localhost:8000/funcionarios?data=${dateOnly}`;

    this.http.get<any[]>(apiUrl).subscribe((data) => {
      this.funcionarios = data.map(funcionario => ({
        ...funcionario,
        checked: funcionario.diaria_marcada // Define o estado do checkbox baseado na API
      }));
    });
  }
}

// Método para marcar diária
marcarDiaria(funcionarioId: number, checked: boolean) {
  if (checked) {
    console.log('Funcionário já tem diária marcada, ação bloqueada.');
    return; // Bloqueia reenvio se já estiver marcado
  }

  if (this.selectedDate) {
    console.log('Enviando para a API:', funcionarioId, this.selectedDate);

    this.funcionariosService.marcarDiaria(funcionarioId, this.selectedDate).subscribe(
      () => {
        console.log('Diária marcada com sucesso');
        this.buscarPorData(); // Atualiza a lista para refletir a nova marcação
      },
      (error) => {
        console.error('Erro ao marcar diária', error);
      }
    );
  } else {
    console.error('Data não selecionada');
  }
}

}
