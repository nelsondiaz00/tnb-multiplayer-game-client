import { provideHttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import prohibitedNames from '../../../assets/json/prohibited-names.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(private router: Router) {}

  @Output() registered = new EventEmitter<void>();
  username = '';
  password = '';
  password2 = '';
  mail = '';
  name = '';
  lastname = '';
  avatar='';
  p1='';
  p2='';
  p3='';
  p4='';
  r1='';
  r2='';
  r3='';
  r4='';


  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  toPage2() {
    if(this.checkAll()){
      const p1 = document.getElementById('pagina1') as HTMLDivElement;
      p1?.classList.add('pagenumber2');
      p1?.classList.remove('pagenumber');
      const p2 = document.getElementById('pagina2') as HTMLDivElement;
      p2?.classList.add('pagenumber');
      p2?.classList.remove('pagenumber2');

      const page1 = document.getElementById('parte1') as HTMLDivElement;
      const page2 = document.getElementById('parte2') as HTMLDivElement;
      page1.classList.add('oculto');
      page2.classList.remove('oculto');
    }else{
      alert('Completa todos los campos para continuar!')
    }
  }

  toPage1() {
    const p1 = document.getElementById('pagina1') as HTMLDivElement;
    p1?.classList.add('pagenumber');
    p1?.classList.remove('pagenumber2');
    const p2 = document.getElementById('pagina2') as HTMLDivElement;
    p2?.classList.add('pagenumber2');
    p2?.classList.remove('pagenumber');

    const page1 = document.getElementById('parte1') as HTMLDivElement;
    const page2 = document.getElementById('parte2') as HTMLDivElement;
    page1.classList.remove('oculto');
    page2.classList.add('oculto');
  }

  changeUsername(target: any) {
    this.username = target.value;
  }

  changePassword(target: any) {
    this.password = target.value;
  }

  changePassword2(target: any) {
    if (this.password === target.value) {
      this.password2 = target.value;
    }
  }

  changeName(target:any){
    this.name = target.value;
  }
  changeLastname(target:any){
    this.lastname = target.value;
  }
  changeMail(target:any){
    this.mail = target.value;
  }
  changeAvatar(target:any){
    this.avatar = target.value;
  }

  changeP1(target:any){
    this.p1 = target.value;
  }
  changeP2(target:any){
    this.p2 = target.value;
  }
  changeP3(target:any){
    this.p3 = target.value;
  }
  changeP4(target:any){
    this.p4 = target.value;
  }

  changeR1(target:any){
    this.r1 = target.value;
  }changeR2(target:any){
    this.r2 = target.value;
  }changeR3(target:any){
    this.r3 = target.value;
  }changeR4(target:any){
    this.r4 = target.value;
  }


  submitRegister() {
    if (this.checkAll2()) {
        if (!localStorage.getItem('users')) {
          const users = [{ user: this.username, password: this.password2, name: this.name, lastname: this.lastname, mail: this.mail, avatar: this.avatar, p1: this.p1, r1: this.r1, p2:this.p2,r2:this.r2,p3:this.p3,r3:this.r3,p4:this.p4,r4:this.r4}];
          localStorage.setItem('users', JSON.stringify(users));
        } else {
          const users = localStorage.getItem('users');
          console.log(users && this.checkAll(), ' wtf hermanoooo ');
          if (users && this.checkAll()) {
            console.log('Formulario válido');
            const usersArray = JSON.parse(users);
            usersArray.push({ user: this.username, password: this.password2, name: this.name, lastname: this.lastname, mail: this.mail, avatar: this.avatar, p1: this.p1, r1: this.r1, p2:this.p2,r2:this.r2,p3:this.p3,r3:this.r3,p4:this.p4,r4:this.r4 });
            localStorage.setItem('users', JSON.stringify(usersArray));
            console.log(usersArray); //QUITAR
            this.router.navigate(['sign-in']);
          }
        }

    }else{
      alert('Completa todos los campos para continuar!')
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
        if (
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(target.value)
        ) {
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
        if (
          password.length >= 8 &&
          hasNumber &&
          hasSpecialChar &&
          hasCapitalLetter
        ) {
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
    const usernameValue = target.value.toLowerCase(); // Convierte a minúsculas para comparar
    const isInvalid = prohibitedNames.some((word) =>
      usernameValue.includes(word)
    );

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


  setImage(target: any){
    const src = target.src;
    const pp = document.getElementById('pp') as HTMLImageElement;
    pp.src = src;
  }

  checkAll(){
      const parte1 = document.getElementById('parte1');
      const validIcons = parte1?.querySelectorAll('.valid');
      return validIcons?.length === 6
  }

  checkAll2(){
    const parte2 = document.getElementById('parte2');
    const validIcons = parte2?.querySelectorAll('.valid');
    return validIcons?.length === 4
  }

  validater1(target: any) {
    const validUserIcon = document.getElementById('rt1-valid-icon');
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

  validater2(target: any) {
    const validUserIcon = document.getElementById('rt2-valid-icon');
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

  validater3(target: any) {
    const validUserIcon = document.getElementById('rt3-valid-icon');
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

  validater4(target: any) {
    const validUserIcon = document.getElementById('rt4-valid-icon');
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


}
