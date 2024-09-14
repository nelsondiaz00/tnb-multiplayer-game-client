import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchManagementViewComponent } from './match-management-view.component';

describe('MatchManagementViewComponent', () => {
  let component: MatchManagementViewComponent;
  let fixture: ComponentFixture<MatchManagementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchManagementViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchManagementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
