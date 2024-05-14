import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly _API = './../../../assets/courses.json'

  constructor(private http: HttpClient) { }
  findAll() {
    return this.http.get<Course[]>(this._API)
  }
}
