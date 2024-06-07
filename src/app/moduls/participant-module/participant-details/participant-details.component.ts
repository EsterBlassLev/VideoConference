import { ParticipantService } from "../ParticipantService";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Participant } from "../../../models/participant";
import { participantType } from "src/app/models/userType.enum";


@Component({
  selector: 'app-participant-details.component',
  templateUrl: './participant-details.component.html',
  styleUrls: ['./participant-details.component.scss']
  //changeDetection:ChangeDetectionStrategy.OnPush
})

export class ParticipantDetailsComponent implements OnInit {
  constructor(private _participantService: ParticipantService, private _acr: ActivatedRoute, private _cdr: ChangeDetectorRef, private _router: Router) { }

  participantId: number = 0;
  private _participant: Participant | undefined;

  // subscriptionParams: Subscription;
  // subscriptionGet: Subscription;
  // subscriptionPut: Subscription;

  ngOnInit(): void {
    // this.subscriptionParams = this._acr.paramMap.subscribe(param => {
    //   if (param.get("id") && param.get("id") != undefined) {
    //     this.participantId = +param.get("id");
        // this.subscriptionGet = this._participantService.getParticipantById(this.participantId).subscribe(data => {
        //   this.participant = data;
        // });
        this._participant = this._participantService.getParticipantById(this.participantId);
    //   }
    // })
  }

  get participant(): Participant | undefined{
    return this._participant;
  }

  set participant(val: Participant) {
    this._participant = val;
    if (val) {
      this.participantForm.controls["id"].setValue(val.id);
      this.participantForm.controls["firstName"].setValue(val.firstName);
      this.participantForm.controls["lastName"].setValue(val.lastName);
      this.participantForm.controls["job"].setValue(val.job);
      this.participantForm.controls["speaker"].setValue(val.speaker);
      this.participantForm.controls["video"].setValue(val.video);

    }
  }

  participantForm: FormGroup = new FormGroup({
    "id": new FormControl("", Validators.required),
    "firstName": new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    "lastName": new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    "job": new FormControl("", [Validators.required]),
    "speaker": new FormControl("", []),
    "video": new FormControl("", []),
  })

  participantToSend: Participant = new Participant();
   enumValues = Object.values(participantType);
   saveParticipant() {
    this.participantToSend.id = this.participantForm.controls["id"].value;
    this.participantToSend.firstName = this.participantForm.controls["firstName"].value;
    this.participantToSend.lastName = this.participantForm.controls["lastName"].value;
    this.participantToSend.job = this.participantForm.controls["job"].value;
    this.participantToSend.speaker = this.participantForm.controls["speaker"].value;
    this.participantToSend.video = this.participantForm.controls["video"].value;
    this._participantService.updateParticipant(this.participantId, this.participantToSend);
    // this._participantService.updateParticipant(this.participantId, this.participantToSend).subscribe(data =>
    // console.log(), err => { console.log("update process failed"); }
    // );
    alert("העדכון נשמר בהצלחה!")
    this._router.navigate(["/participants"]);
  }
  
  // ngOnDestroy(): void {
  //   this.subscriptionParams.unsubscribe();
  //   this.subscriptionGet.unsubscribe();
  //   if (this.subscriptionPut != undefined)
  //     this.subscriptionPut.unsubscribe();
  // }
}