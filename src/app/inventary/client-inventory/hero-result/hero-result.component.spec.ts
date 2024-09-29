import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroResultComponent } from './hero-result.component';

describe('HeroResultComponent', () => {
  let component: HeroResultComponent;
  let fixture: ComponentFixture<HeroResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
