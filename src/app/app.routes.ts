import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/home/home').then(m => m.Home),
    title: 'Home'
  },
  {
    path: 'recipes',
    children: [
      {
        path: 'new',
        loadComponent: () =>
          import('../app/recipe-form/recipe-form').then(m => m.RecipeForm),
        title: 'New Recipe'
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./recipe-details/recipe-details').then(m => m.RecipeDetails),
        title: 'Recipe'
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('../app/recipe-form/recipe-form').then(m => m.RecipeForm),
        title: 'Edit Recipe'
      }
    ]
  },
  {
    path: '**',
    loadComponent: () =>
      import('../app/not-found/not-found').then(m => m.NotFound),
    title: 'Not Found'
  }
];
