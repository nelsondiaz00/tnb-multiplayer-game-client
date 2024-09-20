import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  @Output() registro = new EventEmitter<void>();
  @Output() inicioSesion = new EventEmitter<void>();

  username = '';
  password = '';

  emitRegistro() {
    this.registro.emit();
  }

  ngOnInit() {
    if (!localStorage.getItem('users')) {
      const users = [{ user: 'Javier', password: '123' },{ user: 'Nelson', password: '123' }];
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  changeUsername(target: any) {
    this.username = target.value;
  }

  changePassword(target: any) {
    this.password = target.value;
  }

  login() {
    if(this.username != '' && this.password != ''){
      const users = localStorage.getItem('users')
      if (users) {
        const usersArray = JSON.parse(users);
        const user = usersArray.find((user: { user: string }) => user.user === this.username);
        if(user){
          if(user.password === this.password){
            const user = { user: this.username, password: this.password }
            localStorage.setItem('loggedUser', JSON.stringify(user));
            this.inicioSesion.emit();
          }
        }
      }
    }
  }

  handleLogin(username: string, password: string) {
    console.log('Username:', username);
    console.log('Password:', password);
    return true;
  }

  toggleIcon(passwordElement: HTMLInputElement) {
    const togglePasswordIcon = document.getElementById('toggle-icon');
    if (passwordElement.type === 'password') {
      passwordElement.type = 'text';
      if (togglePasswordIcon != null) {
        togglePasswordIcon.classList.add('on');
        togglePasswordIcon.classList.remove('off');
      }
    } else {
      passwordElement.type = 'password';
      if (togglePasswordIcon != null) {
        togglePasswordIcon.classList.remove('on');
        togglePasswordIcon.classList.add('off');
      }
    }
  }

  validateUsername(target: any) {
    const validUserIcon = document.getElementById('username-valid-icon');
    if (target.value === '') {
      if (validUserIcon != null) {
        validUserIcon.classList.add('empty');
        validUserIcon.classList.remove('valid');
        validUserIcon.classList.remove('invalid');
      }
    } else {
      if (validUserIcon != null) {
        if (/^[a-zA-Z]+$/.test(target.value)) {
          validUserIcon.classList.add('valid');
          validUserIcon.classList.remove('invalid');
          validUserIcon.classList.remove('empty');
        } else {
          validUserIcon.classList.add('invalid');
          validUserIcon.classList.remove('valid');
          validUserIcon.classList.remove('empty');
        }
      }
    }
  }

  validatePassword(target: any) {
    const validPassIcon = document.getElementById('password-valid-icon');
    if (target.value === '') {
      if (validPassIcon != null) {
        validPassIcon.classList.add('empty');
        validPassIcon.classList.remove('valid');
        validPassIcon.classList.remove('invalid');
      }
    } else {
      if (validPassIcon != null) {
        const password = target.value;
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasCapitalLetter = /[A-Z]/.test(password);
        if (password.length >= 8 && hasNumber && hasSpecialChar && hasCapitalLetter) {
          validPassIcon.classList.add('valid');
          validPassIcon.classList.remove('invalid');
          validPassIcon.classList.remove('empty');
        } else {
          validPassIcon.classList.add('invalid');
          validPassIcon.classList.remove('valid');
          validPassIcon.classList.remove('empty');
        }
      }
    }
  }

  checkEmpty(emptyIcons: string) {
    if (emptyIcons.length > 0) {
      return true;
    } else {
      return false;
    }
  }


  //  ︵‿︵‿୨♡୧ PAGINA DOS (2FA) ୨♡୧‿︵‿︵

  handle2fa(code: string) {
    //window.location.href = 'inicio.html';
    console.log('Code:', code);
    return true;
  }

  validateCode(code: string) {
    return code === '';
  }
}
