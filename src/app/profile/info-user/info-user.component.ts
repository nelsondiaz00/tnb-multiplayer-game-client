import { Component } from '@angular/core';

@Component({
  selector: 'app-info-user',
  standalone: true,
  imports: [],
  templateUrl: './info-user.component.html',
  styleUrl: './info-user.component.css'
})
export class InfoUserComponent {

  username = '';
  mail = '';
  name = '';
  lastname = '';
  avatar='';

  ngOnInit(){
    this.setProfile()
  }

  setProfile(){ //ARREGLAR
    /*if (!localStorage.getItem('users')) {
      const users = [{ user: this.username, name: this.name, lastname: this.lastname, mail: this.mail, avatar: this.avatar}];
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      const users = localStorage.getItem('users');
      if (users) {
        const usersArray = JSON.parse(users);
        const user = usersArray.find(
          (user: { user: string }) => user.user === this.username
        );
        if (user) {
          console.log('hola');

        }
      }
    }*/
  }

  changeInfo(){
    const contenedorParte1 = document.getElementById('parte1')
    const contenedorParte2 = document.getElementById('parte2')

    contenedorParte1?.classList.add('oculto');
    contenedorParte2?.classList.remove('oculto');
  }

  saveInfo(){
    const contenedorParte1 = document.getElementById('parte1')
    const contenedorParte2 = document.getElementById('parte2')

    contenedorParte2?.classList.add('oculto');
    contenedorParte1?.classList.remove('oculto');
  }

  setImage(target: any){
    const src = target.src;
    const pp = document.getElementById('pp') as HTMLImageElement;
    pp.src = src;
  }
}
