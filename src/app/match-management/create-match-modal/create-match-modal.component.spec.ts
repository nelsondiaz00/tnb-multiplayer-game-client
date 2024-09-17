import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMatchModalComponent } from './create-match-modal.component';

describe('CreateMatchModalComponent', () => {
  let component: CreateMatchModalComponent;
  let fixture: ComponentFixture<CreateMatchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMatchModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMatchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
