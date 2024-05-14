import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CategoryPipe } from '../shared/pipes/category.pipe';
import { CoursesService } from './services/courses.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    CategoryPipe,
    MatIconModule
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export default class CoursesComponent {
  displayedColumns = ['name', 'category']
  private readonly _coursesSVC = inject(CoursesService)
  public courses = this._coursesSVC.courses
}
