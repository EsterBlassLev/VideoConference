import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ParticipantService } from '../ParticipantService';
import { Participant } from '../../../models/participant';
import { Router } from '@angular/router';


@Component({
  selector: 'app-participant-list.component',
  templateUrl: 'participant-list.component.html',
  styleUrls: ['./participant-list.component.scss']
  //אם היתה לי אפשרות הייתי עושה את זה כאן וכן הייתי כותבת את מה שכתבתי בהמשך שלא רלוונ.lטי כרגע
  //changeDetection: ChangeDetectionStrategy.Default
})

export class ParticipantListComponent implements OnInit {

  constructor(private _participantService:ParticipantService, private _cdr: ChangeDetectorRef, private _router: Router) {  }

  subscribtion:Subscription | undefined;
  participantsjudge: Participant[]=[];
  participantsOthers: Participant[]=[];
  videoElement:any;
  cameraStream: MediaStream|undefined;
  screenStream:any;
  mediaRecorder: MediaRecorder | undefined;
  recordedChunks: Blob[] = [];
  sharedScreen:boolean = false;
  recording:boolean = false;
  @ViewChild('video', { static: true }) video: ElementRef;
  videoStream: any;
  participants:number;
  ngOnInit(): void {
    // this.subscribtion=this._participantService.getAllParticipants().subscribe(data=>{
    //   this.participants=data;
    //   this._cdr.detectChanges();
    // })
    this.participantsjudge = this._participantService.getAllParticipantsjudge();
    this.participantsOthers = this._participantService.getAllParticipantsOthers();
    this.videoElement = document.getElementById('videoElement');
    this.participants = this.participantsjudge.length+this.participantsOthers.length
  }

  details(participant:Participant){
    this._router.navigate(["/participant/"+participant.id]);
  }

  async toggleCamera() {
    if (this.cameraStream) {
      this.cameraStream.getTracks().forEach(track => track.stop());
      this.videoElement.srcObject = null;
      this.cameraStream = undefined;
    } else {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.videoElement.srcObject = stream;
          this.cameraStream = stream;
        })
        .catch(error => {
          console.log('Error accessing camera:', error);
        });
    }

  }

  async displayScreen() {
    try {
      this.screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      this.videoElement.srcObject = this.screenStream;
    } catch (error) {
      console.error('Error displaying screen:', error);
    }
    this.sharedScreen=!this.sharedScreen;
  }

  stopDisplay() {
    this.sharedScreen=!this.sharedScreen;
    if (this.screenStream) {
      this.screenStream.getTracks().forEach((track: { stop: () => any; }) => track.stop());
      this.videoElement.srcObject = null;
      this.screenStream = null;
    }
  }

  async startScreenRecording() {
    try {
      this.screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });

      this.mediaRecorder = new MediaRecorder(this.screenStream);
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();
      this.recording=!this.recording;
    } catch (error) {
      console.error('Error starting screen recording:', error);
    }
    // part.recording =!part.recording;
  }

  stopScreenRecording() {
    // part.recording=!part.recording;
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    this.downloadRecording();
  }

  downloadRecording() {
    const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = 'screen-recording.webm';
    a.click();
    window.URL.revokeObjectURL(url);
  }


  // ngOnDestroy(): void {
  //   this.subscribtion.unsubscribe();
  // }

}