import { Injectable } from '@angular/core';
import { OpenTeam } from '../../models/openTeam';

@Injectable({
  providedIn: 'root'
})
export class OpenTeamService {
  constructor(private _openTeamService:OpenTeamService) { }
  updateOpen(teamToUpdate: OpenTeam) {
        // return this._http.put<OpenTeam>("/api/OpenTeam/UpdateOpenTeam/", teamToUpdate);
    }
}
