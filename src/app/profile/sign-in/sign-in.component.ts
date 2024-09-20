import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
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
      const users = [
        { user: 'Javier', password: 'Javier123*' },
        { user: 'Nelson', password: 'Nelson123*' },
      ];
      localStorage.setItem('users', JSON.stringify(users));
    }
    // localStorage.setItem('users', '');
  }

  changeUsername(target: any) {
    this.username = target.value;
  }

  changePassword(target: any) {
    this.password = target.value;
  }

  login() {
    if (this.username != '' && this.password != '') {
      const users = localStorage.getItem('users');
      if (users) {
        const usersArray = JSON.parse(users);
        const user = usersArray.find(
          (user: { user: string }) => user.user === this.username
        );
        if (user) {
          if (user.password === this.password) {
            const user = { user: this.username, password: this.password };
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

  toogleIcon(password: HTMLInputElement) {
    if (password.type === 'password') {
      return true;
    } else {
      return false;
    }
  }

  validateUsername(username: string) {
    if (username === '') {
      return false;
    } else {
      return true;
    }
  }

  validatePassword(password: string) {
    if (password === '') {
      return false;
    } else {
      return true;
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
