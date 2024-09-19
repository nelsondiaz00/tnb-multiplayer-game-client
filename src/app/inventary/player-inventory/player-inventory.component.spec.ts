import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInventoryComponent } from './player-inventory.component';

describe('PlayerInventoryComponent', () => {
  let component: PlayerInventoryComponent;
  let fixture: ComponentFixture<PlayerInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
