import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InserirGastoPage } from './inserir-gasto.page';

describe('InserirGastoPage', () => {
  let component: InserirGastoPage;
  let fixture: ComponentFixture<InserirGastoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirGastoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
