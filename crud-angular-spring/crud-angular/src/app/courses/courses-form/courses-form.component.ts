import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CoursesService } from '../services/courses.service';

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
export default class CoursesFormComponent {
  private _coursesSvc = inject(CoursesService)
  private _snackBar = inject(MatSnackBar)
  private location = inject(Location)
  public courses = this._coursesSvc.courses
  form: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
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
