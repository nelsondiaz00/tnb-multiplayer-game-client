import { provideHttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import prohibitedNames from './prohibited-names.json';

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
          localStorage.setItem('users', JSON.stringify(usersArray));
          this.registered.emit();
        }
      }
    }
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

  validateName(target: any) {
    const validNameIcon = document.getElementById('name-valid-icon');
    if (target.value === '') {
      if (validNameIcon != null) {
        validNameIcon.classList.add('empty');
        validNameIcon.classList.remove('valid');
        validNameIcon.classList.remove('invalid');
      }
    } else {
      if (validNameIcon != null) {
        if (/^[a-zA-ZñÑ]+$/.test(target.value)) {
          validNameIcon.classList.add('valid');
          validNameIcon.classList.remove('invalid');
          validNameIcon.classList.remove('empty');
        } else {
          validNameIcon.classList.add('invalid');
          validNameIcon.classList.remove('valid');
          validNameIcon.classList.remove('empty');
        }
      }
    }
  }

  validateLastname(target: any) {
    const validNameIcon = document.getElementById('lastname-valid-icon');
    if (target.value === '') {
      if (validNameIcon != null) {
        validNameIcon.classList.add('empty');
        validNameIcon.classList.remove('valid');
        validNameIcon.classList.remove('invalid');
      }
    } else {
      if (validNameIcon != null) {
        if (/^[a-zA-ZñÑ]+$/.test(target.value)) {
          validNameIcon.classList.add('valid');
          validNameIcon.classList.remove('invalid');
          validNameIcon.classList.remove('empty');
        } else {
          validNameIcon.classList.add('invalid');
          validNameIcon.classList.remove('valid');
          validNameIcon.classList.remove('empty');
        }
      }
    }
  }

  validateEmail(target: any) {
    const validEmailIcon = document.getElementById('email-valid-icon');
    if (target.value === '') {
      if (validEmailIcon != null) {
        validEmailIcon.classList.add('empty');
        validEmailIcon.classList.remove('valid');
        validEmailIcon.classList.remove('invalid');
      }
    } else {
      if (validEmailIcon != null) {
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(target.value)) {
          validEmailIcon.classList.add('valid');
          validEmailIcon.classList.remove('invalid');
          validEmailIcon.classList.remove('empty');
        } else {
          validEmailIcon.classList.add('invalid');
          validEmailIcon.classList.remove('valid');
          validEmailIcon.classList.remove('empty');
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

  validatePasswordsMatch(target: any) {
    const validPassMatchIcon = document.getElementById('password2-valid-icon');
    if (target.value === '') {
      if (validPassMatchIcon != null) {
        validPassMatchIcon.classList.add('empty');
        validPassMatchIcon.classList.remove('valid');
        validPassMatchIcon.classList.remove('invalid');
      }
    } else {
      if (validPassMatchIcon != null) {
        if (target.value === this.password) {
          validPassMatchIcon.classList.add('valid');
          validPassMatchIcon.classList.remove('invalid');
          validPassMatchIcon.classList.remove('empty');
        } else {
          validPassMatchIcon.classList.add('invalid');
          validPassMatchIcon.classList.remove('valid');
          validPassMatchIcon.classList.remove('empty');
        }
      }
    }
  }

  validateUsername(target: any) {
    const validUsernameIcon = document.getElementById('username-valid-icon');
    console.log(prohibitedNames);
    console.log(prohibitedNames.includes(target.value.toLowerCase()));
    const usernameValue = target.value.toLowerCase(); // Convierte a minúsculas para comparar
    const isInvalid = prohibitedNames.some(word => usernameValue.includes(word));


    if (target.value === '') {
      if (validUsernameIcon != null) {
        validUsernameIcon.classList.add('empty');
        validUsernameIcon.classList.remove('valid');
        validUsernameIcon.classList.remove('invalid');
      }
    } else {
      if (validUsernameIcon != null) {
        if (/^[a-zA-Z0-9]+$/.test(target.value)) {
          if (isInvalid) {
            validUsernameIcon.classList.add('invalid');
            validUsernameIcon.classList.remove('valid');
            validUsernameIcon.classList.remove('empty');
          } else {
            validUsernameIcon.classList.add('valid');
            validUsernameIcon.classList.remove('invalid');
            validUsernameIcon.classList.remove('empty');
          }
        } else {
          validUsernameIcon.classList.add('invalid');
          validUsernameIcon.classList.remove('valid');
          validUsernameIcon.classList.remove('empty');
        }
      }
    }
  }
}
