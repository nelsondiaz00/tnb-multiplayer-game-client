import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-recover',
  standalone: true,
  imports: [],
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.css',
})
export class RecoverComponent {
  constructor(private router: Router, private userService: UserService) {}

  username = '';
  mail = '';
  name = '';
  lastname = '';
  avatar = '';
  password = '';
  p1 = '';
  p2 = '';
  p3 = '';
  p4 = '';
  r1 = '';
  r2 = '';
  r3 = '';
  r4 = '';

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  emitProfile() {
    this.navigateTo('profile');
  }

  ngOnInit() {
    this.setQuestions();
  }

  setQuestions() {
    if (!localStorage.getItem('users')) {
      const users = [
        {
          user: this.username,
          name: this.name,
          lastname: this.lastname,
          mail: this.mail,
          avatar: this.avatar,
          password: this.password,
          p1: this.p1,
          p2: this.p2,
          p3: this.p3,
          p4: this.p4,
          r1: this.r1,
          r2: this.r2,
          r3: this.r3,
          r4: this.r4,
        },
      ];
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      let user = localStorage.getItem('loggedUser');
      if (user) {
        const user2 = JSON.parse(user);
        if (user2) {
          const p1Label = document.getElementById('p1');
          if (p1Label) p1Label.textContent = user2.p1;
          const p2Label = document.getElementById('p2');
          if (p2Label) p2Label.textContent = user2.p2;
          const p3Label = document.getElementById('p3');
          if (p3Label) p3Label.textContent = user2.p3;
          const p4Label = document.getElementById('p4');
          if (p4Label) p4Label.textContent = user2.p4;
        }
      }
    }
  }

  sendCode() {
    if (!localStorage.getItem('users')) {
      const users = [
        {
          user: this.username,
          name: this.name,
          lastname: this.lastname,
          mail: this.mail,
          avatar: this.avatar,
          password: this.password,
          p1: this.p1,
          p2: this.p2,
          p3: this.p3,
          p4: this.p4,
          r1: this.r1,
          r2: this.r2,
          r3: this.r3,
          r4: this.r4,
        },
      ];
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      let user = localStorage.getItem('loggedUser');
      if (user) {
        const user2 = JSON.parse(user);
        if (user2) {
          const r1Input = document.getElementById('r1') as HTMLInputElement;
          const rtaCorrecta1 = user2.r1;
          const r2Input = document.getElementById('r2') as HTMLInputElement;
          const rtaCorrecta2 = user2.r2;
          const r3Input = document.getElementById('r3') as HTMLInputElement;
          const rtaCorrecta3 = user2.r3;
          const r4Input = document.getElementById('r4') as HTMLInputElement;
          const rtaCorrecta4 = user2.r4;

          if (
            r1Input &&
            r2Input &&
            r3Input &&
            r4Input &&
            r1Input.value === rtaCorrecta1 &&
            r2Input.value === rtaCorrecta2 &&
            r3Input.value === rtaCorrecta3 &&
            r4Input.value === rtaCorrecta4
          ) {
            const hiddenButton = document.getElementById('parte2');
            if (hiddenButton) {
                hiddenButton.classList.remove('oculto');
            }
          } else {
            this.popUp()
            setTimeout(() => {
              this.popUp();
            },2000)
          }
        }
      }
      //TODO ENVIAR CODIGO AL CORREO
    }
  }

  verifyCode() {
    const code = document.getElementById('code') as HTMLInputElement;
    if (code) console.log(code.value);
    //TODOVERIFICAR QUE EL CODIGO SI  SEA CORRECTO
    //cuando no es correcto llamar a popup2
    this.changePassword();
  }

  changePassword() {
    const hiddenForm = document.getElementById('parte3');
    const shownForm = document.getElementById('parte1');
    if (hiddenForm && shownForm) {
      hiddenForm.classList.toggle('oculto');
      shownForm.classList.toggle('oculto');
    }
  }

  saveNewPassword() {
    const password = document.getElementById('newPassword') as HTMLInputElement;
    if (password) this.password = password.value;
    //TODO
    this.navigateTo('profile');
  }

  validatePassword() {
    const passInput = document.getElementById('newPassword') as HTMLInputElement;
    if(passInput){
    if (passInput.value === '') {
          this.popUp3();
          setTimeout(() => {
            this.popUp3();
          }, 2000);
    } else {
        const password = passInput.value;
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasCapitalLetter = /[A-Z]/.test(password);
        if (
          password.length >= 8 &&
          hasNumber &&
          hasSpecialChar &&
          hasCapitalLetter
        ) {

          this.saveNewPassword()
        } else {
          
          this.popUp3();
          setTimeout(() => {
            this.popUp3();
          }, 2000);

      }
    }
  }
  }



  popUp() {
    var popup = document.getElementById("myPopup");
    if(popup){
      popup.classList.toggle("show");
      popup.textContent = ' Respuestas incorrectas :c '
    }
  }

  popUp2() {
    var popup = document.getElementById("myPopup2");
    if(popup){
      popup.classList.toggle("show");
      popup.textContent = ' Código incorrecto :c '
    }
  }

  popUp3() {
    var popup = document.getElementById("myPopup3");
    if(popup){
      popup.classList.toggle("show");
      popup.textContent = ' Debe tener min. 8 characteres y debe contener 1 número, 1 caractér especial y 1 mayúscula! '
    }
  }


}

