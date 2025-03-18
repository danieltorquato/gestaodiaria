import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelatorioGastosPage } from './relatorio-gastos.page';

describe('RelatorioGastosPage', () => {
  let component: RelatorioGastosPage;
  let fixture: ComponentFixture<RelatorioGastosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioGastosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
