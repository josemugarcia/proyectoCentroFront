import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEddMedicoComponent } from './add-edd-medico.component';

describe('AddEddMedicoComponent', () => {
  let component: AddEddMedicoComponent;
  let fixture: ComponentFixture<AddEddMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEddMedicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEddMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
