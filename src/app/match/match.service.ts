import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMatch } from '../_models/interfaces/match.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private jsonUrl = 'assets/good.json';

  constructor(private http: HttpClient) {}

  getMatch(): Observable<IMatch> {
    return this.http.get<IMatch>(this.jsonUrl);
  }
}
