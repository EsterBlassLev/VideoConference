import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OpenTeamService } from './open-team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenTeam } from '../../models/openTeam';

@Component({
  selector: 'app-open-team',
  templateUrl: './open-team.component.html',
  styleUrls: ['./open-team.component.scss']
})
export class OpenTeamComponent implements OnInit {

  constructor(private _openTeamService:OpenTeamService, private _acr: ActivatedRoute,private _router: Router) { }
private _openteam:OpenTeam | undefined;
  ngOnInit(): void {
  }

  get openteam(): OpenTeam | undefined{
    return this._openteam;
  }

  set openteam(val: OpenTeam) {
    this._openteam = val;
    if (val) {
      this.openForm.controls["title"].setValue(val.title);
      this.openForm.controls["caseNumber"].setValue(val.caseNumber);
    }
  }

  openForm: FormGroup = new FormGroup({
    "title": new FormControl("", Validators.required),
    "caseNumber": new FormControl("", [Validators.required]),
  })

  openTeamToSend: OpenTeam = new OpenTeam();

  saveConference() {
    this.openTeamToSend.title = this.openForm.controls["title"].value;
    this.openTeamToSend.caseNumber = this.openForm.controls["caseNumber"].value;
    this._openTeamService.updateOpen(this.openTeamToSend);
    // this._openTeamService.updateOpen(this.openTeamToSend).subscribe(data =>
    // console.log(), err => { console.log("update process failed"); }
    // );
    alert("העדכון נשמר בהצלחה!")
    this._router.navigate(["/participants/"+0]);
  }


}
