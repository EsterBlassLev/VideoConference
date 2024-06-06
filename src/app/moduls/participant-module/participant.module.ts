import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantService } from './ParticipantService';
import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParticipantListComponent } from './participant-list-component/participant-list.component';
import { ParticipantDetailsComponent } from './participant-details/participant-details.component';

const APP_ROUTES: Route[] = [
  { path:"", pathMatch: "full", redirectTo: "participant" },
  { path: "participant", component: ParticipantListComponent },
  { path: "participant/:id", component: ParticipantDetailsComponent },
];

@NgModule({
  declarations: [ParticipantListComponent, ParticipantDetailsComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule , RouterModule.forChild(APP_ROUTES)],
  providers: [ParticipantService],
  exports: [ParticipantListComponent]

})
export class ParticipantModule { }
