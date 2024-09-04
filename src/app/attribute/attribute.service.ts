import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAttribute } from '../_models/interfaces/attribute.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AttributeService {
  private jsonUrl = 'assets/input1.json';

  constructor(private http: HttpClient) {}

  getAttributes(): Observable<IAttribute[]> {
    return this.http
      .get<any>(this.jsonUrl)
      .pipe(map((data) => Object.values(data.attributes)));
  }
}
