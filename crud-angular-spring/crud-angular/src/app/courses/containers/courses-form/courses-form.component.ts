import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';


@Component({
  selector: 'app-courses-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './courses-form.component.html',
  styleUrl: './courses-form.component.scss'
})
export default class CoursesFormComponent implements OnInit {

  private _coursesSvc = inject(CoursesService)
  private _snackBar = inject(MatSnackBar)
  private location = inject(Location)
  private route = inject(ActivatedRoute)
  public courses = this._coursesSvc.courses
  private readonly formBuilder = inject(NonNullableFormBuilder)

  form = this.formBuilder.group({
    _id: [''],
    name: [''],
    category: ['']
  });

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course']
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    })
  }

  onSubmit() {
    this._coursesSvc.save(this.form.value)
      .subscribe({
        next: result => this.onSucess(),
        error: error => this.onError(),
      })
  }

  onError() {
    this._snackBar.open("Erro ao adicionar", '', { duration: 3000 });
  }

  onSucess() {
    this._snackBar.open("Curso adicionado com sucesso", '', { duration: 3000 });
    this.onCancel()
  }
  onCancel() {
    this.location.back()
  }
}