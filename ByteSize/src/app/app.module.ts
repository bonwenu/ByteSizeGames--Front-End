import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LeaderBoardComponent } from './components/leader-board/leader-board.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './module/material.module';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { SocketComponent } from './components/socket/socket.component';
import { QuestionsComponent } from './components/questions/questions.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LeaderBoardComponent,
    ProfileComponent,
    LoginSignupComponent,
    SocketComponent,
    QuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
