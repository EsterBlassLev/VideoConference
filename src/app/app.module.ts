import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { PageNotFountComponent } from "./moduls/page-not-fount/page-not-fount.component";
import { ParticipantListComponent } from "./moduls/participant-module/participant-list-component/participant-list.component";
import { ParticipantDetailsComponent } from "./moduls/participant-module/participant-details/participant-details.component";
import { ParticipantModule } from "./moduls/participant-module/participant.module";
import { OpenTeamComponent } from "./moduls/open-team/open-team.component";
import { OpenTeamModule } from "./moduls/open-team/open-team.module";

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "home"},
    { path: "participants", component: ParticipantListComponent },
    {path: "details", component: ParticipantDetailsComponent},
    {path: "open", component: OpenTeamComponent},
    { path: "**", component: PageNotFountComponent }
];

@NgModule({
    declarations: [AppComponent,PageNotFountComponent],
    imports: [OpenTeamModule, ParticipantModule,RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    
}