import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerGastosPage } from './ver-gastos.page';

describe('VerGastosPage', () => {
  let component: VerGastosPage;
  let fixture: ComponentFixture<VerGastosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerGastosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
