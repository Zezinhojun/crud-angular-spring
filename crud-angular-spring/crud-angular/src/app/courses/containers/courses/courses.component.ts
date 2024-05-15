import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { CoursesService } from '../../services/courses.service';

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
    MatIconModule,
    MatButtonModule,
    CoursesListComponent
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export default class CoursesComponent {
  private readonly _coursesSVC = inject(CoursesService)
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)
  public courses = this._coursesSVC.courses
  displayedColumns = ['_id', 'name', 'category', 'actions']

  constructor() {
    this._coursesSVC.getAllCourse().pipe(take(1)).subscribe()
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
}
