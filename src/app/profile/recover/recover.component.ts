import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-recover',
  standalone: true,
  imports: [],
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.css'
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
    this.router.navigate([route])
  }

  ngOnInit(){
    this.setQuestions()
  }

  setQuestions(){
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

  sendCode(){
    console.log('Codigo enviado');

    //TODO
  }

  verifyCode(){
    const code = document.getElementById('code') as HTMLInputElement;
    if (code) console.log(code.value);
    //TODO
  }


}
