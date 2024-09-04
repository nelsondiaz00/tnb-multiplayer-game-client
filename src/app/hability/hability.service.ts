import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from '../_models/interfaces/product.interfaces';

@Injectable({
  providedIn: 'root',
})
export class HabilityService {
  private jsonUrl = 'assets/input1.json';

  constructor(private http: HttpClient) {}

  getHabilities(): Observable<IProduct[]> {
    return this.http
      .get<{ products: { [key: string]: IProduct } }>(this.jsonUrl)
      .pipe(
        map((data) => Object.values(data.products)),
        map((products: IProduct[]) =>
          products.filter((product) => product.productType === 'hability')
        )
      );
  }
}
