import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { disableDebugTools } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { Participant } from "../../models/participant";
import { participantType } from "../../models/userType.enum";
// כרגע בגלל שאין חיבור לSERVER 
// אמיתי שמתי משתנים מקומיים ועליהם הפעלתי את הפונקציות 
// אבל בהערה שמתי את הפונקציה האמיתית שאמורה להיות בפרויקט אמיתי

@Injectable()
export class ParticipantService {

    private participantsOthers: Participant[] = [
        {
            id: 2,
            firstName: 'Joh',
            lastName: 'Minz',
            job: participantType.Lawyerdefendant,
            speaker: false,
            video: true,
            sharedScreen: false,
            recording: false
        },
        {
            id: 3,
            firstName: 'Maya',
            lastName: 'Baron',
            job: participantType.defendant,
            speaker: true,
            video: false,
            sharedScreen: false,
            recording: false
        }
    ];

    private participantsjudge: Participant[] = [
        {
            id: 2,
            firstName: 'Joh',
            lastName: 'Minz',
            job: participantType.judge,
            speaker: false,
            video: true,
            sharedScreen: false,
            recording: false
        }]
    constructor(private _http: HttpClient) { }

    // getAllParticipants(): Observable<Participant[]> {
    //     return this._http.get<Participant[]>("api/Participant/GetParticipants");
    // }
    getAllParticipantsOthers() {
        return this.participantsOthers;
    }

    getAllParticipantsjudge() {
        return this.participantsjudge;
    }

    // getParticipantById(id:number): Observable<Participant> {
    //     return this._http.get<Participant>("/api/Participant/GetParticipantById/"+id)
    // }

    getParticipantById(id: number) {
        if (this.participantsOthers.find(p => p.id === id) !== undefined)
            return this.participantsOthers.find(p => p.id === id);
        return this.participantsjudge.find(p => p.id === id);
    }

    // updateParticipant(id: number, participantToUpdate: Participant) {
    //     return this._http.put<Participant>("/api/Participant/UpdateParticipant/" + id, participantToUpdate);
    // }
    private index: number = 0;
    updateParticipant(id: number, participantToUpdate: Participant) {
        if (participantToUpdate.job !== participantType.judge) {
            this.index = this.participantsOthers.findIndex(p => p.id === id);
            if (this.index !== -1) {
                this.participantsOthers =this.participantsOthers.slice(this.index, this.index + 1);
                console.log(this.participantsOthers);
            }
            if(participantToUpdate.job===participantType.Lawyerdefendant) {        
            this.participantsOthers.push(participantToUpdate);
            }
            else{
                this.participantsjudge.push(participantToUpdate);
            }
        }

        else {
            this.index = this.participantsjudge.findIndex(p => p.id === id);
            if (this.index !== -1)
                this.participantsjudge = this.participantsjudge.slice(this.index, this.index + 1)
            if(participantToUpdate.job !== participantType.judge) {        
                this.participantsOthers.push(participantToUpdate);
                }
                else{
                    this.participantsjudge.push(participantToUpdate);
                }        }

    }
}