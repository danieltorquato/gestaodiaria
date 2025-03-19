import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-relatorio-funcionarios',
  templateUrl: './relatorio-funcionarios.page.html',
  styleUrls: ['./relatorio-funcionarios.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RelatorioFuncionariosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
