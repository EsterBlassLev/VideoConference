import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ParticipantDetailsComponent } from '../participant-module/participant-details/participant-details.component';
import { OpenTeamComponent } from './open-team.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { OpenTeamService } from './open-team.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [OpenTeamComponent],
  imports: [CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
  ],  
  providers:[OpenTeamService],
  exports:[OpenTeamComponent]
})

export class OpenTeamModule { }
