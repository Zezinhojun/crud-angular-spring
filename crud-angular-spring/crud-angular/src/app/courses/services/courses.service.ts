import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, take, tap } from 'rxjs';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private _http = inject(HttpClient)
  private readonly _API = 'api/courses'
  public courses = signal<Course[]>([] as Course[])

  getAllCourse() {
    return this._http
      .get<Course[]>(this._API)
      .pipe(tap(res => this.courses.set(res)))
  }

  save(course: Course): Observable<Course> {
    return this._http
      .post<Course>(this._API, course)
      .pipe(take(1))
  }
}
