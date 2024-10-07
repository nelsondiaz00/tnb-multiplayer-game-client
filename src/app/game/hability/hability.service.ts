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
    const habilities: IProduct[] = products.filter(
      (product) => product.productType === 'hability'
    );
    return of(habilities);
  }
}
