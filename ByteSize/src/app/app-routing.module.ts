import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LeaderBoardComponent } from './components/leader-board/leader-board.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SocketComponent } from './components/socket/socket.component';
import { QuestionsComponent } from './components/questions/questions.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'leader-board',
    component: LeaderBoardComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'login-signup',
    component: LoginSignupComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: "socket",
    component: SocketComponent
  },
  {
    path: "questions",
    component: QuestionsComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
