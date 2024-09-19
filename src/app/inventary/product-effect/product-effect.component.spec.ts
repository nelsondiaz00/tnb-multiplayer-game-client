import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEffectComponent } from './product-effect.component';

describe('ProductEffectComponent', () => {
  let component: ProductEffectComponent;
  let fixture: ComponentFixture<ProductEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEffectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
