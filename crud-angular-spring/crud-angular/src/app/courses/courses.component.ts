import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Course } from './model/course';
import { CoursesService } from './services/courses.service';
import { HttpClientModule } from '@angular/common/http';
import { first, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatToolbarModule, HttpClientModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export default class CoursesComponent implements OnInit {
  courses: Observable<Course[]>
  private readonly _coursesSVC = inject(CoursesService)
  displayedColumns = ['name', 'category']

  constructor() {
    this.courses = this._coursesSVC.findAll()
  }

  ngOnInit(): void {

  }

}
