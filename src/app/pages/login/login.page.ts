import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonInput } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonInput, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  cpf: string = '';
  senha: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Inicializa o campo de CPF com a máscara
    this.cpf = this.formatarCPF(this.cpf);
  }

  // Função que formata o CPF
  formatarCPF(cpf: string): string {
    // Remove qualquer caractere não numérico
    cpf = cpf.replace(/\D/g, '');

    // Aplica a máscara de CPF ###.###.###-##
    if (cpf.length <= 11) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
  }

  // Função que é chamada ao digitar
  onCpfChange() {
    // Formata o CPF sempre que o usuário digitar
    this.cpf = this.formatarCPF(this.cpf);
  }

  login() {
    const cpfFormatado = this.cpf.replace(/\D/g, '');  // Remove qualquer caractere não numérico
    console.log('CPF digitado:', cpfFormatado);  // Debug: Veja o valor do CPF digitado
    const cpfValid = '12345678901';  // CPF de exemplo
    const senhaValid = '123456';     // Senha de exemplo

    if (cpfFormatado === cpfValid && this.senha === senhaValid) {
      this.router.navigate(['/agendamentos']);  // Redireciona para a tela de agendamentos
    } else {
      alert('CPF ou senha inválidos!');
    }
  }
}
