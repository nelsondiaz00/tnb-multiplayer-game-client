import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotViewComponent } from './chat-bot-view.component';

describe('ChatBotViewComponent', () => {
  let component: ChatBotViewComponent;
  let fixture: ComponentFixture<ChatBotViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBotViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBotViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
