import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCitaConfirmationComponent } from './delete-cita-confirmation.component';

describe('DeleteCitaConfirmationComponent', () => {
  let component: DeleteCitaConfirmationComponent;
  let fixture: ComponentFixture<DeleteCitaConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteCitaConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteCitaConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
