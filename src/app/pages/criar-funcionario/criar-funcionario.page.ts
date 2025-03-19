import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonButton, IonInput } from '@ionic/angular/standalone';
import { FuncionariosService } from 'src/app/services/funcionarios.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // Importa a Camera do Capacitor

@Component({
  selector: 'app-criar-funcionario',
  templateUrl: './criar-funcionario.page.html',
  styleUrls: ['./criar-funcionario.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonLabel, IonItem, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CriarFuncionarioPage implements OnInit {
  prévia = ''; // URL da imagem selecionada
  valorDiaria: any;
  sucesso: boolean = false;
  erro: boolean = false;
  @ViewChild('formulario') formulario: any;  // Captura o formulário
  funcionario: any = {
    nome: '',
    valorDiaria: '',
    foto: ''
  };
  constructor(private funcionarioService: FuncionariosService) { }

  ngOnInit() {
  }
   // Função para selecionar uma foto da galeria
   async selecionarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });



      if (image) {
        this.funcionario.foto = image.dataUrl || ''; // A URL da imagem selecionada ou uma string vazia como fallback

      }
    } catch (error) {
      console.error("Erro ao selecionar a foto:", error);
    }
  }

  criarFuncionario(formulario: any) {
    this.funcionario.nome = formulario.controls['nome'].value;
    this.funcionario.valorDiaria = formulario.controls['valorDiaria'].value;
    this.funcionarioService.criarFuncionario(this.funcionario.nome, this.funcionario.foto, this.funcionario.valorDiaria).subscribe(
      response => {
        this.sucesso = true;
        this.erro = false;
        console.log('Funcionário criado:', response);
      },
      error => {
        this.erro = true;
        this.sucesso = false;
        console.log(this.funcionario.nome, this.funcionario.foto,'Valor diária:', this.funcionario.valorDiaria);
        console.error('Erro ao criar funcionário:', error);
      }
    );
  }
}
