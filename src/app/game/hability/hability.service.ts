import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from '../../_models/interfaces/product.interfaces';
import { UserService } from '../../_services/user.service';

@Injectable({
  providedIn: 'root',
})
export class HabilityService {
  // private jsonUrl = 'assets/json/input-weapon.json';

  constructor(private userService: UserService) {}

  getHabilities(): Observable<IProduct[]> {
    const products: IProduct[] =
      this.userService.getHeroSelected()?.products || [];
    let habilities: IProduct[] = products.filter(
      (product) => product.productType === 'hability'
    );
    habilities = habilities.map((hability) => {
      hability.imagePath = this.getImagePath(hability.productName);
      return hability;
    });
    console.log(habilities);
    return of(habilities);
  }

  getImagePath(name: string): string {
    name = name.trimEnd();
    const newName = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ñ/g, 'n')
      .replace(/\s+/g, '-')
      .toLowerCase();
    // console.log(`assets/game-images/${type}/${newName}.png`);
    return `${newName}.png`;
  }
}
