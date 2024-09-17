import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartBattleModalComponent } from './start-battle-modal.component';

describe('StartBattleModalComponent', () => {
  let component: StartBattleModalComponent;
  let fixture: ComponentFixture<StartBattleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartBattleModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartBattleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
