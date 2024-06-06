import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ParticipantService } from '../ParticipantService';
import { Participant } from '../../../models/participant';


@Component({
  selector: 'app-participant-list.component',
  templateUrl: 'participant-list.component.html',
  styleUrls: ['./participant-list.component.scss']
  //אם היתה לי אפשרות הייתי עושה את זה כאן וכן הייתי כותבת את מה שכתבתי בהמשך שלא רלוונ.lטי כרגע
  //changeDetection: ChangeDetectionStrategy.Default
})

export class ParticipantListComponent implements OnInit {

  constructor(private _participantService:ParticipantService, private _cdr: ChangeDetectorRef) {  }

  subscribtion:Subscription | undefined;
  participantsjudge: Participant[]=[];
  participantsOthers: Participant[]=[];
  videoElement:any;
  cameraStream: MediaStream|undefined;
  screenStream:any;
  mediaRecorder: MediaRecorder | undefined;
  recordedChunks: Blob[] = [];

  ngOnInit(): void {
    // this.subscribtion=this._participantService.getAllParticipants().subscribe(data=>{
    //   this.participants=data;
    //   this._cdr.detectChanges();
    // })
    this.participantsjudge = this._participantService.getAllParticipantsjudge();
    this.participantsOthers = this._participantService.getAllParticipantsOthers();
    this.videoElement = document.getElementById('videoElement');
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

  async displayScreen(part:Participant) {
    try {
      this.screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      this.videoElement.srcObject = this.screenStream;
    } catch (error) {
      console.error('Error displaying screen:', error);
    }
    part.sharedScreen=!part.sharedScreen;
  }

  stopDisplay(part:Participant) {
    part.sharedScreen=!part.sharedScreen;
    if (this.screenStream) {
      this.screenStream.getTracks().forEach((track: { stop: () => any; }) => track.stop());
      this.videoElement.srcObject = null;
      this.screenStream = null;
    }
  }

  async startScreenRecording(part:Participant) {
    try {
      this.screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });

      this.mediaRecorder = new MediaRecorder(this.screenStream);
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();
      part.recording=!part.recording;
    } catch (error) {
      console.error('Error starting screen recording:', error);
    }
  }

  stopScreenRecording(part:Participant) {
    part.recording=!part.recording;
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