import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IAttribute } from '../../_models/interfaces/attribute.interfaces';
import { UserService } from '../../_services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AttributeService {
 //  private jsonUrl = 'assets/json/input-weapon.json';

  constructor(private userService: UserService, private http: HttpClient) {}

  getAttributes(): Observable<IAttribute[]> {
    const attributes = this.userService.getHeroSelected()?.attributes;
    return attributes ? of(Object.values(attributes)) : of([]);
  }
}
