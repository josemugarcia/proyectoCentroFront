import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EddUserComponent } from './edd-user.component';

describe('EddUserComponent', () => {
  let component: EddUserComponent;
  let fixture: ComponentFixture<EddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EddUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
