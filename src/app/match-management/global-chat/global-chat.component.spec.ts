import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalChatComponent } from './global-chat.component';
import { FormsModule } from '@angular/forms';

describe('GlobalChatComponent', () => {
  let component: GlobalChatComponent;
  let fixture: ComponentFixture<GlobalChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalChatComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send a message', () => {
    const testMessage = { sender: 'User1', text: 'Hello World' };
    component.newMessage = testMessage.text;
    component.sendMessage();
    expect(component.messages).toContain(jasmine.objectContaining(testMessage));
  });

  it('should clear the input after sending a message', () => {
    component.newMessage = 'Another Message';
    component.sendMessage();
    expect(component.newMessage).toBe('');
  });

  it('should not send empty messages', () => {
    component.newMessage = '';
    component.sendMessage();
    expect(component.messages.length).toBe(0);
  });
});
