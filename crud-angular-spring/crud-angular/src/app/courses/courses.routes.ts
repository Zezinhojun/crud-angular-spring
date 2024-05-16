import { Routes } from '@angular/router';

import { CourseResolver } from './guards/course.resolver';

const routes: Routes = [
  { path: '', loadComponent: () => import('./containers/courses/courses.component') },
  { path: 'new', loadComponent: () => import('./containers/courses-form/courses-form.component'), resolve: { course: CourseResolver } },
  { path: 'edit/:id', loadComponent: () => import('./containers/courses-form/courses-form.component'), resolve: { course: CourseResolver } }
]

export default routes
