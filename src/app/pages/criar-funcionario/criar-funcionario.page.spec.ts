import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarFuncionarioPage } from './criar-funcionario.page';

describe('CriarFuncionarioPage', () => {
  let component: CriarFuncionarioPage;
  let fixture: ComponentFixture<CriarFuncionarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarFuncionarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
