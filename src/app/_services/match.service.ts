import { IMatch } from '../_models/interfaces/match.interfaces';
import { ITeam } from '../_models/interfaces/team.interface';
import { teamSide } from '../_models/types/team.type';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  reconstructMatch(data: IMatch): IMatch {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format');
    }

    const teamsEntries: [teamSide, ITeam][] = Object.entries(data.teams).map(
      ([key, value]) => {
        if (key === 'blue' || key === 'red') {
          return [key as teamSide, value as ITeam];
        } else {
          throw new Error(`Invalid teamSide key: ${key}`);
        }
      }
    );

    const teams: Map<teamSide, ITeam> = new Map<teamSide, ITeam>(teamsEntries);
    return {
      idMatch: data.idMatch,
      size: data.size,
      teams: teams,
      owner: data.owner,
    };
  }
}
