import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';

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

  constructor(private router: Router, private userService: UserService) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  username = '';
  password = '';

  emitLanding() {
    this.navigateTo('landing');
  }

  emitRegistro() {
    this.navigateTo('sign-up');
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
            // this.userService.setIdUser(user.user);
            console.log('User:', this.userService.getIdUser());
            this.navigateTo('match-management-view');
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
        validUserIcon.classList.add('valid');
        validUserIcon.classList.remove('empty');
        validUserIcon.classList.remove('invalid');
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
        validPassIcon.classList.add('valid');
        validPassIcon.classList.remove('empty');
        validPassIcon.classList.remove('invalid');
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
