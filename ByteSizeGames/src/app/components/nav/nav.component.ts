import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetCategoryService } from 'src/app/services/get-category.service';
import { QuestionService } from 'src/app/services/question.service';
import { Result } from 'src/app/models/Question';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from 'rxjs';

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {

  //hidden: boolean = true;

  constructor(
    private getCatService: GetCategoryService,
    private questionService: QuestionService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    //this.validateLogin();
  }

  ngOnInit() {
    console.log("ngOnInit called");
    this.getCategories();
    this.validateLogin();
  }

  leaderboard_play_logout: boolean;
  logIn: boolean;

  isLoggedIn: Observable<boolean>;                  // {1}


  validateLogin(){
    //console.log("On load navs are hidden " + this.hidden);
    console.log("what is in the session storage? " + sessionStorage.getItem("User"));
    if (sessionStorage.getItem("User") !== null){ // user is LOGGED IN
      // shows leaderboard_play_logout;
      // DONT show Login
      this.leaderboard_play_logout = true;
      this.logIn = false;
      console.log("User logged in?");
      console.log("Should show leaderboard_play_logout " + this.leaderboard_play_logout)
      console.log("Should NOT show logIn " + this.logIn);
    } else { // NOT Logged In
      // DONT show leaderboard_play_logout
      // shows Login
      this.leaderboard_play_logout = false;
      this.logIn = true;
      console.log("User NOT logged in");
      console.log("Should NOT show leaderboard_play " + this.leaderboard_play_logout);
      console.log("Should show logIn " + this.logIn);
    }
  };

  logOut() {
    this.logIn = true;
    sessionStorage.removeItem("User");
    window.sessionStorage.clear();
    localStorage.clear();
    console.log("Log out is clicked. Expect session storage length of 0: " + sessionStorage.length);
    window.location.reload();
    //this.router.navigateByUrl("/home");
  }

  getLeaderboard() {
    console.log("Loading Table");
  }

  routeToGame() {
    this.spinner.show("toGameSpinner");
    setTimeout(() => {
      this.router.navigate(["/game"]);
      this.spinner.hide("toGameSpinner");
    }, 4000); //5s
  }

  categories_array = [];
  chosenCategory: number = 0;
  difficulty_array = ["any", "easy", "medium", "hard"];
  chosenDifficulty: string = "any";

  q_: Result = {
    category: "",
    type: "",
    difficulty: "",
    question: "",
    correct_answer: "",
    incorrect_answers: []
  };

  sendQuestionInfoToService(): void {
    console.log("inside send");
    console.log(this.chosenCategory);
    console.log(this.chosenDifficulty);
    this.questionService.setQuestionInfo(
      this.chosenCategory,
      this.chosenDifficulty
    );
  }

  getCategories() {
    this.getCatService.getCategoryList().then(all_categories => {
      this.categories_array = all_categories.trivia_categories;
      //console.log("Category array is " + this.categories_array);
    });
  }

  // Debug function
  showChosenCategoryLog() {
    console.log("this is the chosenCategory " + this.chosenCategory);
  }

  // Debug function
  showChosenDifficultyLog() {
    console.log("this is the chosenDifficulty " + this.chosenDifficulty);
  }
}
