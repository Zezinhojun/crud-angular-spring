import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CoursesService } from './services/courses.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatToolbarModule, HttpClientModule, MatProgressSpinnerModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export default class CoursesComponent {
  displayedColumns = ['name', 'category']
  private readonly _coursesSVC = inject(CoursesService)
  public courses = this._coursesSVC.courses
}
