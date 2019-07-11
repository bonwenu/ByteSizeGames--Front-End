import { Injectable } from '@angular/core';

import { Categories } from 'src/app/models/Categories';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetCategoryService {

  constructor(private http: HttpClient) { }

  categoryList: string = 'https://opentdb.com/api_category.php';

  getCategoryList(): Promise<Categories> {
    //console.log('getting list of category');
    return this.http.get<Categories>(this.categoryList).toPromise();
  }

}
