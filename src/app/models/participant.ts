import { participantType } from "./userType.enum";

export class Participant{
    id: number;
    firstName: string;
    lastName: string;
    job:participantType;
    video:boolean;
    speaker:boolean;
    sharedScreen:boolean;
    recording:boolean;
    constructor(){
        this.id = 0;
        this.firstName ="";
        this.lastName = "";
        this.job=participantType.Lawyerdefendant;
        this.video=false;
        this.speaker = false
        this.sharedScreen = false;
        this.recording = false;
    }
}