import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { take, tap } from 'rxjs';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly _http = inject(HttpClient)
  private readonly _API = 'api/courses'
  public courses = signal<Course[]>([] as Course[])

  getAllCourse() {
    return this._http
      .get<Course[]>(this._API)
      .pipe(tap(res => this.courses.set(res)))
  }

  loadById(id: string) {
    return this._http
      .get<Course>(`${this._API}/${id}`)
  }
  save(course: Partial<Course>) {
    if (course._id) this.update(course)
    return this.create(course)
  }

  private create(course: Partial<Course>) {
    return this._http
      .post<Course>(this._API, course)
      .pipe(take(1))
  }
  private update(course: Partial<Course>) {
    return this._http
      .put<Course>(`${this._API}/${course._id}`, course)
      .pipe(take(1))
  }
  delete(id: string) {
    return this._http
      .delete(`${this._API}/${id}`)
      .pipe(take(1),
        tap(() => {
          this.courses.set(this.courses().filter(course => course._id !== id))
        }))
  }
}
