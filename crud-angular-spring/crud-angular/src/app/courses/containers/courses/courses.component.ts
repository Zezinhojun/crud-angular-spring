import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';

import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ErrorDialogComponent } from '../../../shared/error-dialog/error-dialog.component';
import { ConfimationDialogComponent } from '../../../shared/confimation-dialog/confimation-dialog.component';

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
    CoursesListComponent,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export default class CoursesComponent {
  private readonly _coursesSVC = inject(CoursesService)
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)
  private _snackBar = inject(MatSnackBar)
  private _dialog = inject(MatDialog)
  public courses = this._coursesSVC.courses
  displayedColumns = ['_id', 'name', 'category', 'actions']

  constructor() {
    this._coursesSVC.getAllCourse().pipe(take(1)).subscribe()
  }

  onError(errorMsg: string) {
    this._dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route })
  }
  onDelete(course: Course) {
    const dialogRef = this._dialog.open(ConfimationDialogComponent, {
      data: 'Tem certeza que deseja remover esse curso?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._coursesSVC.delete(course._id).subscribe({
          next: () => {
            this._snackBar.open("Curso Removido com sucesso", 'x', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error: () => this.onError('Erro ao tentar remover curso.')
        })
      }
    });

  }
}
