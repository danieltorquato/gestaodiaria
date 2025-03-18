import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonButton, IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonContent, ],
})
export class HomePage implements OnInit {

  constructor(private router: Router) { }



  ngOnInit() {

  }
   // Navega para a página selecionada
 navigateTo(page: string) {
  this.router.navigate([`/${page}`]);
}
}
