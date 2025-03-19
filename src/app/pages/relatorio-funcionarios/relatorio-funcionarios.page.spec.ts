import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelatorioFuncionariosPage } from './relatorio-funcionarios.page';

describe('RelatorioFuncionariosPage', () => {
  let component: RelatorioFuncionariosPage;
  let fixture: ComponentFixture<RelatorioFuncionariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioFuncionariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
