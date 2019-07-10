import { Component, OnInit } from '@angular/core';
import { GetCategoryService } from 'src/app/services/get-category.service';
import { QuestionService } from 'src/app/services/question.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    
  gameListArray = [];

  categories_array = [];
  chosenCategory: number = 0;
  difficulty_array = ["any", "easy", "medium", "hard"];
  chosenDifficulty: string = "any";

  constructor(private getCatService: GetCategoryService, private questionService: QuestionService) {
  }

  sendQuestionInfoToService(): void {
    console.log("inside send");
    console.log(this.chosenCategory);
    console.log(this.chosenDifficulty);
    this.questionService.setQuestionInfo(this.chosenCategory, this.chosenDifficulty);
  }

  


  ngOnInit() {
    this.getCategories();
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
