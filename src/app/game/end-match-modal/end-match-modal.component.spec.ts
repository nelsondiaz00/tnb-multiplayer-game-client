import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndMatchModalComponent } from './end-match-modal.component';

describe('EndMatchModalComponent', () => {
  let component: EndMatchModalComponent;
  let fixture: ComponentFixture<EndMatchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndMatchModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndMatchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
