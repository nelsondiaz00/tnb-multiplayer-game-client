import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  @Output() registered = new EventEmitter<void>();

  username = '';
  password = '';
  password2 = '';

  toPage2() {
    (document.getElementById('parte1') as HTMLDivElement).style.display= 'none';
    (document.getElementById('parte2') as HTMLDivElement).style.display= 'block';
  }

  toPage1() {
    (document.getElementById('parte1') as HTMLDivElement).style.display= 'block';
    (document.getElementById('parte2') as HTMLDivElement).style.display= 'none';
  }

  changeUsername(target: any) {
    this.username = target.value;
  }

  changePassword(target: any) {
    this.password = target.value;
  }

  changePassword2(target: any) {
    if(this.password === target.value) {
      this.password2 = target.value;
    }
  }

  submitRegister(){
    if( (this.password2 === this.password) && this.password2!='' ){
      if (!localStorage.getItem('users')) {
        const users = [{ user: this.username, password: this.password2 }];
        localStorage.setItem('users', JSON.stringify(users));
      }else{
        const users = localStorage.getItem('users')
        if(users){
          const usersArray = JSON.parse(users);
          usersArray.push({ user: this.username, password: this.password2 });
          this.registered.emit();
        }
      }
    }
  }
}
