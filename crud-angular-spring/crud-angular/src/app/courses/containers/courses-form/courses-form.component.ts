import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
  private readonly formBuilder = inject(NonNullableFormBuilder)
  public courses = this._coursesSvc.courses

  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    category: ['', [Validators.required,]]
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

  private onError() {
    this._snackBar.open("Erro ao adicionar", 'x', { duration: 3000 });
  }

  private onSucess() {
    this._snackBar.open("Curso salvo com sucesso", 'x', { duration: 3000 });
    this.onCancel()
  }
  onCancel() {
    this.location.back()
  }
  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) return 'Campo obrigatório'
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5
      return `Tamanho minimo precisa ser de ${requiredLength} caracteres`
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 100
      return `Tamanho minimo precisa ser de ${requiredLength} caracteres`
    }
    return 'Campo inválido'

  }
}
