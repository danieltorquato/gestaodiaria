import { Routes } from '@angular/router';
import { GastosPage } from './pages/gastos/gastos.page';
import { InserirGastoPage } from './pages/inserir-gasto/inserir-gasto.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'agendamentos',
    loadComponent: () => import('./pages/agendamentos/agendamentos.page').then( m => m.AgendamentosPage)
  },
  {
    path: 'gastos',
    loadComponent: () => import('./pages/gastos/gastos.page').then( m => m.GastosPage)
  },
  {
    path: 'inserir-gasto',
    loadComponent: () => import('./pages/inserir-gasto/inserir-gasto.page').then( m => m.InserirGastoPage)
  },
  { path: 'gastos', component: GastosPage },
  { path: 'inserir-gasto/:categoria', component: InserirGastoPage },
  { path: '', redirectTo: '/gastos', pathMatch: 'full' },
  {
    path: 'ver-gastos',
    loadComponent: () => import('./pages/ver-gastos/ver-gastos.page').then( m => m.VerGastosPage)
  },
  {
    path: 'relatorio-gastos',
    loadComponent: () => import('./pages/relatorio-gastos/relatorio-gastos.page').then( m => m.RelatorioGastosPage)
  },  {
    path: 'compartilhar-gastos',
    loadComponent: () => import('./pages/compartilhar-gastos/compartilhar-gastos.page').then( m => m.CompartilharGastosPage)
  },
  {
    path: 'criar-funcionario',
    loadComponent: () => import('./pages/criar-funcionario/criar-funcionario.page').then( m => m.CriarFuncionarioPage)
  },
  {
    path: 'relatorios',
    loadComponent: () => import('./pages/relatorios/relatorios.page').then( m => m.RelatoriosPage)
  },
  {
    path: 'relatorio-funcionarios',
    loadComponent: () => import('./pages/relatorio-funcionarios/relatorio-funcionarios.page').then( m => m.RelatorioFuncionariosPage)
  },


];
