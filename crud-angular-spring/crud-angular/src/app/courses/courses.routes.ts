import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./containers/courses/courses.component') },
  { path: 'new', loadComponent: () => import('./containers/courses-form/courses-form.component') }
]

export default routes
