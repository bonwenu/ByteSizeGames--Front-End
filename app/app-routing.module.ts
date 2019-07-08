import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

const routes: Routes = [ {
  path: 'home',
  component: HomeComponent
},{
  path: 'login',
  component: LoginComponent
}, {
  path: 'leaderboard',
  component: LeaderboardComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
