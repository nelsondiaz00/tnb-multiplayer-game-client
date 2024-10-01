import { Component } from '@angular/core';

@Component({
  selector: 'app-info-user',
  standalone: true,
  imports: [],
  templateUrl: './info-user.component.html',
  styleUrl: './info-user.component.css'
})
export class InfoUserComponent {

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
