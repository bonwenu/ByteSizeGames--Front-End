import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { ModalModule } from 'ngx-bootstrap/modal'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { LoginServiceService } from './services/login-service.service';
import { QuestionService } from './services/question.service';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { PlayComponent } from './components/play/play.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { GameComponent } from './components/game/game.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GetCategoryService } from './services/get-category.service';

import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { ButtonsModule } from 'ngx-bootstrap/buttons';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    HomeComponent,
    LeaderboardComponent,
    PlayComponent,
    LobbyComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    FormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatButtonModule,

    ModalModule.forRoot(),

    ButtonsModule.forRoot()
  ],
  providers: [LoginServiceService, QuestionService, GetCategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
