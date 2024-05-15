import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./courses.component') },
  { path: 'new', loadComponent: () => import('./courses-form/courses-form.component') }
]

export default routes
