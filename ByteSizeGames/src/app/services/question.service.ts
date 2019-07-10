import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Question, Result } from "src/app/models/Question";

import { HomeComponent } from "src/app/components/home/home.component";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { getQueryPredicate } from "@angular/compiler/src/render3/view/util";

@Injectable({
  providedIn: "root"
})
export class QuestionService implements OnInit {

  questionReceived: Promise<Boolean>;
  flag = false;

  url = "https://opentdb.com/api.php?amount=1";

  private _Category: number;
  private _Difficulty: string;

  res_: Result[] = [
    {
      category: "",
      type: "",
      difficulty: "",
      question: "",
      correct_answer: "",
      incorrect_answers: []
    }
  ];
  question_: Question = { results: this.res_ };
  questions_: Question[] = [];
  question_Asked: boolean = false;
  q_: Result = {
    category: "",
    type: "",
    difficulty: "",
    question: "",
    correct_answer: "",
    incorrect_answers: []
  };

  setQuestion(c: number, d: string) {
    this._Category = c;
    this._Difficulty = d;
  }

  public setQuestionInfo(c: number, d: string) {
    //return new Promise((resolve, reject) => {
     // this.setQuestion(c, d);
     this._Category = c;
     this._Difficulty = d;
      console.log("inside setQuestionInfo");
      console.log(this._Category);
      console.log(this._Difficulty);
      console.log(this.questionReceived); // Undefined
      if(this._Category == 0 && this._Difficulty == 'any') {
        this.url = "https://opentdb.com/api.php?amount=1";
      } else if(this._Category == 0 && this._Difficulty != 'any') {
        this.url = "https://opentdb.com/api.php?amount=1&difficulty=" + this._Difficulty;
      } else if(this._Category != 0 && this._Difficulty == 'any') {
        this.url = "https://opentdb.com/api.php?amount=1&category=" + this._Category;
      } else {
        this.url = "https://opentdb.com/api.php?amount=1&category=" + this._Category + "&difficulty=" + this._Difficulty;
      }      
      console.log(this.url);
      this.questionReceived = Promise.resolve(true);
      console.log(this.questionReceived);
      this.flag = true;
      console.log("flag is " + this.flag);
      //resolve();
    //});
  }

  //url: string = 'https://opentdb.com/api.php?amount=1'

  constructor(private http: HttpClient) {}

  getQuestion() {
    return this.http.get<Question>(this.url).toPromise();
  }

  ngOnInit() {}
}
