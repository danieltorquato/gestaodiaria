import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonLabel, IonCard, IonRow, IonCol, IonGrid, IonBackButton, IonButtons, IonItem, IonList, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonList, IonItem, IonButtons, IonBackButton, IonGrid, IonCol, IonRow, IonCard, IonLabel, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
})
export class GastosPage implements OnInit {


  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {

  }
   // Navega para a tela de inserção de gasto com a categoria selecionada
   abrirInserirGasto(categoria: string) {
    this.router.navigate(['/inserir-gasto', { categoria }]);
  }
   abrirVerGastos() {
    this.router.navigate(['/ver-gastos']);
  }

}
