import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [CategoryPipe, MatTableModule, MatIconModule, MatButtonModule,],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent {
  @Input() courses: Course[] = []
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  displayedColumns = ['name', 'category', 'actions']
  onEdit(element: Course) {
    this.edit.emit(element)

  }
  onAdd() {
    this.add.emit(true)
  }
}