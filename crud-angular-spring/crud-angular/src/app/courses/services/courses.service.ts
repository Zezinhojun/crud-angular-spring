import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { take, tap } from 'rxjs';

import { Course } from '../model/course';
import { CoursePage } from '../model/course-page';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly _http = inject(HttpClient)
  private readonly _API = 'api/courses'
  public courses = signal<Course[]>([] as Course[])
  public totalElements = signal<number>(0)
  public totalPages = signal<number>(0)

  getAllCourse(page = 0, pageSize = 10) {
    return this._http
      .get<CoursePage>(this._API, { params: { page, pageSize } })
      .pipe(take(1))
      .subscribe(response => {
        this.totalElements.set(response.totalElements);
        this.totalPages.set(response.totalPages);
        this.courses.set(response.courses)
      });
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
