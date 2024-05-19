import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, UntypedFormArray, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';


import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';
import { CoursesService } from '../../services/courses.service';
import { FormUtilsService } from '../../../shared/form/form-utils.service';


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
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './courses-form.component.html',
  styleUrl: './courses-form.component.scss'
})
export default class CoursesFormComponent implements OnInit {

  constructor(_snackBar: CoursesService) { }

  private _coursesSvc = inject(CoursesService)
  private _snackBar = inject(MatSnackBar)
  private location = inject(Location)
  private route = inject(ActivatedRoute)
  private readonly formBuilder = inject(NonNullableFormBuilder)
  public _formUtilsSvc = inject(FormUtilsService)
  public courses = this._coursesSvc.courses

  form!: FormGroup

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)]],
      category: [course.category, [Validators.required,]],
      lessons: this.formBuilder.array(this.retrieveLessons(course), Validators.required)
    });
  }

  private retrieveLessons(course: Course) {
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = { id: '', name: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)]],
      youtubeUrl: [lesson.youtubeUrl, [Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100)]]
    });
  }

  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

  addNewLesson() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  removeLesson(index: number) {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      this._coursesSvc.save(this.form.value)
        .subscribe({
          next: result => this.onSuccess(),
          error: error => this.onError(),
        })
    } else {
      this._formUtilsSvc.validateAllFromFields(this.form)
    }
  }

  // onSubmit() {
  //   if (this.form.valid) {
  //     this._coursesSvc.save(this.form.value)
  //       .subscribe({
  //         next: result => this.onSuccess(),
  //         error: error => this.onError()
  //       });
  //   } else {
  //     this._formUtilsSvc.validateAllFromFields(this.form);
  //   }
  // }

  private onError() {
    this._snackBar.open("Erro ao adicionar", 'x', { duration: 3000 });
  }

  private onSuccess() {
    this._snackBar.open("Curso salvo com sucesso", 'x', { duration: 3000 });
    this.onCancel()
  }
  onCancel() {
    this.location.back()
  }

}
