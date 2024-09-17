import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilityComponent } from './hability.component';

describe('HabilityComponent', () => {
  let component: HabilityComponent;
  let fixture: ComponentFixture<HabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
