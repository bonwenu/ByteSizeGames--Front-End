import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getQuestions() {

    return this.http.get("https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple")

  }
}
