import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-info-user',
  standalone: true,
  imports: [],
  templateUrl: './info-user.component.html',
  styleUrl: './info-user.component.css',
})
export class InfoUserComponent {

  constructor(private router: Router, private userService: UserService) {}

  navigateTo(route: string) {
    this.router.navigate([route])
  }

  username = '';
  mail = '';
  name = '';
  lastname = '';
  avatar = '';
  password2 = '';



  emitLanding() {
    this.navigateTo('landing');
  }

  ngOnInit() {
    this.setProfile();
  }

  setProfile() {
    //ARREGLAR
    if (!localStorage.getItem('users')) {
      const users = [
        {
          user: this.username,
          name: this.name,
          lastname: this.lastname,
          mail: this.mail,
          avatar: this.avatar,
        },
      ];
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      let user = localStorage.getItem('loggedUser');
      if (user) {
        const user2 = JSON.parse(user);
        if (user2) {
          const userLabel = document.getElementById('username');
          if (userLabel) this.username = userLabel.textContent = user2.user;
          const nameLabel = document.getElementById('name');
          if (nameLabel) this.name = nameLabel.textContent = user2.name;
          const lastnameLabel = document.getElementById('lastname');
          if (lastnameLabel)
            this.lastname = lastnameLabel.textContent = user2.lastname;
          const mailLabel = document.getElementById('mail');
          if (mailLabel) this.mail = mailLabel.textContent = user2.mail;
          const pp = document.getElementById('pp') as HTMLImageElement;
          if (pp) this.avatar = pp.src = user2.avatar;
        }
      }
    }
  }

  changeInfo() {
    const contenedorParte1 = document.getElementById('parte1');
    const contenedorParte2 = document.getElementById('parte2');
    contenedorParte1?.classList.add('oculto');
    contenedorParte2?.classList.remove('oculto');
    if (!localStorage.getItem('users')) {
      const users = [
        {
          user: this.username,
          name: this.name,
          lastname: this.lastname,
          mail: this.mail,
          avatar: this.avatar,
        },
      ];
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      let user = localStorage.getItem('loggedUser');
      if (user) {
        const user2 = JSON.parse(user);
        if (user2) {
          const nameInput = document.getElementById('nameInput');
          if (nameInput) nameInput.setAttribute('value', user2.name);
          const lastnameInput = document.getElementById('lastnameInput');
          if (lastnameInput)
            lastnameInput.setAttribute('value', user2.lastname);
          const mailInput = document.getElementById('mailInput');
          if (mailInput) mailInput.setAttribute('value', user2.mail);
        }
      }
    }
  }

  changeName() {
    const nameInput = document.getElementById('nameInput') as HTMLInputElement;
    if (nameInput) this.name = nameInput.value;
  }

  changeLastname() {
    const lastnameInput = document.getElementById(
      'lastnameInput'
    ) as HTMLInputElement;
    if (lastnameInput) this.lastname = lastnameInput.value;
  }

  changeMail() {
    const mailInput = document.getElementById('mailInput') as HTMLInputElement;
    if (mailInput) this.mail = mailInput.value;
  }

  saveInfo() {
    const contenedorParte1 = document.getElementById('parte1');
    const contenedorParte2 = document.getElementById('parte2');
    contenedorParte2?.classList.add('oculto');
    contenedorParte1?.classList.remove('oculto');

    const users = localStorage.getItem('users');
    if (users) {
      //console.log('Formulario válido');
      let usersArray = JSON.parse(localStorage.getItem('users') || '') || [];

      // Filtrar el array para eliminar el usuario con el mismo id
      usersArray = usersArray.filter(
        (user: { username: string }) => user.username !== this.username
      );

      console.log('voy a cambiar mis datos');

      for (let i = 0; i < usersArray.length; i++) {
        if (usersArray[i].user == this.username) {
          usersArray[i].mail = this.mail;
          usersArray[i].name = this.name;
          usersArray[i].lastname = this.lastname;
        }

        localStorage.setItem('loggedUser', JSON.stringify(usersArray[i]));
      }

      // Guardar el array actualizado en localStorage
      localStorage.setItem('users', JSON.stringify(usersArray));
      console.log(usersArray); //QUITAR
    }
    this.setData()
  }

  setData(){
    const user = localStorage.getItem('loggedUser');
    if (user) {
      const user2 = JSON.parse(user);
      if (user2) {
        const userLabel = document.getElementById('username');
        if (userLabel) userLabel.textContent = user2.user;
        const nameLabel = document.getElementById('name');
        if (nameLabel) nameLabel.textContent = user2.name;
        const lastnameLabel = document.getElementById('lastname');
        if (lastnameLabel) lastnameLabel.textContent = user2.lastname;
        const mailLabel = document.getElementById('mail');
        if (mailLabel) mailLabel.textContent = user2.mail;
        const pp = document.getElementById('pp') as HTMLImageElement;
        if (pp) pp.src = user2.avatar;
      }
    }
  }

  setImage(target: any) {
    const src = target.src;
    const pp = document.getElementById('pp') as HTMLImageElement;
    pp.src = src;
    if (!localStorage.getItem('users')) {
      const users = [
        {
          user: this.username,
          name: this.name,
          lastname: this.lastname,
          mail: this.mail,
          avatar: this.avatar,
        },
      ];
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      let user = localStorage.getItem('loggedUser');
      if (user) {
        const user2 = JSON.parse(user);
        if (user2) {
          user2.avatar = src;
        }
      }
    }
  }

  notChanges() {
    alert('No se han realizado cambios');
  }
}
