import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { first } from 'rxjs';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private _http = inject(HttpClient)
  private readonly _API = './../../../assets/courses.json'
  private courses$ = this._http.get<Course[]>(this._API).pipe(first())
  public courses = toSignal(this.courses$, { initialValue: [] as Course[] })
}
