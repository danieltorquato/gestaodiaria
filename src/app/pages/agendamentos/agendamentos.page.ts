import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonThumbnail, IonHeader, IonList, IonItem, IonLabel, IonCol, IonRow, IonText, IonAvatar, IonDatetime, IonIcon, IonDatetimeButton, IonModal, IonCheckbox, IonToolbar, IonTitle, IonButtons, IonLoading, IonToast, IonBackButton, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgModel } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FuncionariosService } from '../../services/funcionarios.service';
import moment from 'moment-timezone';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.page.html',
  styleUrls: ['./agendamentos.page.scss'],
  standalone: true,
    imports: [IonFabButton, IonIcon,IonFab, IonBackButton, IonToast, IonLoading, IonCheckbox, IonText, IonRow, IonCol, IonContent, IonCard, IonCardHeader, IonCardTitle, IonText, IonCardContent, CommonModule, IonCheckbox, FormsModule, IonButton, IonButton, IonCol, IonRow, IonText, IonHeader, IonToolbar, IonButtons, IonTitle],
  })
export class AgendamentosPage implements OnInit {
  selectedDate: string = ""; // Variável para armazenar a data selecionada
   dataInicio: string = ""; // Variável para armazenar a data selecionada
   dataFinal: string = ""; // Variável para armazenar a data selecionada
   funcionarios: any[] = [];
   isModalOpen: boolean = false;
   isLoading = false;
   showToast = false;
   toastMessage: string = "";

  constructor(private router: Router, private http: HttpClient,  private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private alertController: AlertController, private funcionariosService: FuncionariosService) { }

  ngOnInit() {
    moment.tz.setDefault('America/Sao_Paulo');
    const today = moment().tz('America/Sao_Paulo');


    this.selectedDate = today.format('YYYY-MM-DD').toString().split('T')[0]; // Garante que a data é formatada corretamente

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
    const url = `${environment.apiUrl}/funcionarios?data=${this.selectedDate}`;
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

async marcarDiaria(funcionarioId: number, checked: boolean) {


  this.isLoading = true;
  try {
    const url = `${environment.apiUrl}/funcionarios/diarias/criar`;
    const data = { funcionario_id: funcionarioId, data: this.selectedDate };

    console.log('🔵 URL da requisição:', url);
    console.log('🟢 Dados da requisição:', JSON.stringify(data));

    const response: any = await this.http.post(url, data).toPromise();
    console.log('🟡 Resposta do servidor:', response);

    if (response && response.diarias !== undefined) {
      // Atualiza SOMENTE o funcionário e SOMENTE para a data selecionada
      this.funcionarios = this.funcionarios.map(f =>
        f.id === funcionarioId ? { ...f, diaria_marcada: true, diarias: response.diarias } : f
      );
      this.buscarPorData(); // Atualiza a lista de funcionários
      this.mostrarToast('Diária marcada com sucesso');
    } else {
      this.mostrarToast('Erro ao marcar diária');
    }
  } catch (error) {
    this.mostrarToast('Erro ao marcar diária');
    console.error('🔴 Erro ao marcar diária:', error);
  } finally {
    this.isLoading = false;
  }
}





// Método para fechar quinzena
// Método para fechar quinzena
async fecharQuinzena() {
  this.isLoading = true;
  try {
    const url = `${environment.apiUrl}/funcionarios/quinzena/fechar`;
    const data = {
      data_fechamento: new Date().toISOString().split('T')[0], // Data atual
    };
    await this.http.post(url, data).toPromise();
    this.buscarPorData(); // Atualiza a lista de funcionários
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

navigateTo(page: string) {
  this.router.navigate([`/${page}`]);
}
}
