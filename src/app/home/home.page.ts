import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonThumbnail, IonHeader, IonList, IonItem, IonLabel, IonCol, IonRow, IonText, IonAvatar, IonDatetime, IonIcon, IonDatetimeButton, IonModal, IonCheckbox, IonToolbar, IonTitle, IonButtons, IonLoading, IonToast } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FuncionariosService } from '../services/funcionarios.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgModel } from '@angular/forms';
import { c } from '@angular/core/navigation_types.d-u4EOrrdZ';
import { LoadingController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonToast, IonLoading, IonButtons, IonTitle, IonToolbar, IonCheckbox,  IonText, IonRow, IonCol, IonContent, IonCard, IonCardHeader, IonCardTitle, IonText, IonCardContent, CommonModule, IonCheckbox, FormsModule, IonButton, IonItem, IonDatetime, IonLabel, IonButton, IonHeader, IonList, IonItem, IonLabel, IonCol, IonRow, IonText, IonAvatar, IonIcon, IonDatetimeButton, IonModal, IonToolbar],
})
export class HomePage implements OnInit {
  selectedDate: string = ""; // Variável para armazenar a data selecionada
  dataInicio: string = ""; // Variável para armazenar a data selecionada
  dataFinal: string = ""; // Variável para armazenar a data selecionada
  funcionarios: any[] = [];
  isModalOpen: boolean = false;
  isLoading = false;
  showToast = false;
  toastMessage: string = "";
  constructor(private router: Router, private funcionariosService: FuncionariosService, private http: HttpClient,  private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private alertController: AlertController) { }

  // Removed the http property declaration

  ngOnInit() {
    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0]; // Garante que a data é formatada corretamente
console.log(this.selectedDate);

    this.funcionariosService.getFuncionariosComDiarias(this.selectedDate).subscribe(data => {
      this.funcionarios = data;
    }, error => {
      console.error('Erro ao carregar funcionários', error);
    });
  }


  // Método para buscar os funcionários por data
 // Método para buscar os funcionários por data e definir o estado do checkbox
// Método para buscar todos os funcionários e verificar se têm diárias na data escolhida
// Método para buscar funcionários por data
async buscarPorData() {
  this.isLoading = true;
  console.log('Buscando funcionários por data:', this.selectedDate); // Log para depuração

  try {
    const url = `http://localhost:8000/funcionarios?data=${this.selectedDate}`;
    console.log('URL da requisição:', url); // Log para depuração

    const response = await this.http.get<any[]>(url).toPromise();
    console.log('Resposta recebida:', response); // Log para depuração

    this.funcionarios = response || [];
  } catch (error) {
    console.error('Erro ao buscar funcionários:', error); // Log para depuração
    this.mostrarToast('Erro ao buscar funcionários');
  } finally {
    this.isLoading = false;
    console.log('Busca concluída'); // Log para depuração
  }
}

// Método para marcar diária
async marcarDiaria(funcionarioId: number, checked: boolean) {
  if (checked) {
    this.mostrarToast('Funcionário já tem diária marcada');
    return;
  }

  this.isLoading = true;
  try {
    const url = 'http://localhost:8000/funcionarios/diarias/criar';
    const data = { funcionarioId, data: this.selectedDate };
    await this.http.post(url, data).toPromise();
    this.mostrarToast('Diária marcada com sucesso');
    this.buscarPorData(); // Atualiza a lista de funcionários
  } catch (error) {
    this.mostrarToast('Erro ao marcar diária');
    console.error('Erro ao marcar diária:', error);
  } finally {
    this.isLoading = false;
  }
}

// Método para fechar quinzena
// Método para fechar quinzena
async fecharQuinzena() {
  this.isLoading = true;
  try {
    const url = 'http://localhost:8000/funcionarios/quinzena/fechar';
    const data = {
      data_fechamento: new Date().toISOString().split('T')[0], // Data atual
    };
    await this.http.post(url, data).toPromise();
    this.mostrarToast('Quinzena fechada com sucesso');
  } catch (error) {
    this.mostrarToast('Erro ao fechar quinzena');
    console.error('Erro ao fechar quinzena:', error);
  } finally {
    this.isLoading = false;
  }
}

// Método para abrir/fechar o modal
setOpen(isOpen: boolean) {
  this.isModalOpen = isOpen;
}

// Método para exibir toast
async mostrarToast(mensagem: string) {
  this.toastMessage = mensagem;
  this.showToast = true;
}
async abrirAlertaFecharQuinzena() {
  const alert = await this.alertController.create({
    header: 'Fechar Quinzena',
    message: 'Tem certeza que deseja fechar a quinzena?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Confirmar',
        handler: () => {
          this.fecharQuinzena(); // Chama a função para fechar a quinzena
        },
      },
    ],
  });

  await alert.present();
}
}
