import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInventoryViewComponent } from './client-inventory-view.component';

describe('ClientInventoryViewComponent', () => {
  let component: ClientInventoryViewComponent;
  let fixture: ComponentFixture<ClientInventoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientInventoryViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientInventoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
