import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadComponent: () => import('./courses.component')
  }
]

export default routes
