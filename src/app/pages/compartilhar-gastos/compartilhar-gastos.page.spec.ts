import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompartilharGastosPage } from './compartilhar-gastos.page';

describe('CompartilharGastosPage', () => {
  let component: CompartilharGastosPage;
  let fixture: ComponentFixture<CompartilharGastosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartilharGastosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
