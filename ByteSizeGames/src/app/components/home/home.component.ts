import { Component, OnInit } from '@angular/core';
import { GetCategoryService } from 'src/app/services/get-category.service';
import { QuestionService } from 'src/app/services/question.service';
import { Result } from 'src/app/models/Question';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
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

  constructor(private getCatService: GetCategoryService, private questionService: QuestionService,
    private spinner: NgxSpinnerService) {
  }

  sendQuestionInfoToService(): void {
    console.log("inside send");
    console.log(this.chosenCategory);
    console.log(this.chosenDifficulty);
    this.questionService.setQuestionInfo(this.chosenCategory, this.chosenDifficulty);
  }


  ngOnInit() {
    this.getCategories();
    this.spinner.show("homeSpinner");
    setTimeout(() => {
      this.spinner.hide("homeSpinner");
    }, 2000); //2s

  }

  getCategories() {
    this.getCatService.getCategoryList(). then((all_categories) => {
      this.categories_array = all_categories.trivia_categories;
      console.log("Category array is " + this.categories_array);
    })
  }

  // Debug function
  showChosenCategoryLog() {
    console.log("this is the chosenCategory " +  this.chosenCategory);
  }

  // Debug function
  showChosenDifficultyLog() {
    console.log("this is the chosenDifficulty " + this.chosenDifficulty);
  }


}
