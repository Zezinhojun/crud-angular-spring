import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

export const CourseResolver: ResolveFn<Course> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const _coursesSvc = inject(CoursesService)

  if (route.params && (route.paramMap.get('id')!)) {
    return _coursesSvc.loadById(route.paramMap.get('id')!);
  }
  return of({ _id: '', name: '', category: '' })
};

