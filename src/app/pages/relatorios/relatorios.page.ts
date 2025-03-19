import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonBackButton, IonButtons, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.page.html',
  styleUrls: ['./relatorios.page.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab, IonButtons, IonBackButton, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RelatoriosPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
}
