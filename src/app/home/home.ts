import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../core/models';
import { ApiInfo } from '../core/api-info';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private api = inject(ApiInfo);
  private router = inject(Router);

  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  q = signal<string>('');
  onlyFav = signal<boolean>(false);

  all = signal<Recipe[]>([]);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.api.getAll().subscribe({
      next: (list) => {
        this.all.set(list);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Failed to load recipes.');
        this.loading.set(false);
      }
    });
  }

  readonly recipes = computed<Recipe[]>(() => {
    const term = this.q().trim().toLowerCase();
    const favOnly = this.onlyFav();
    let list = this.all();

    if (term) {
      list = list.filter(r =>
        r.title.toLowerCase().includes(term) ||
        (r.shortDescription ?? '').toLowerCase().includes(term) ||
        (r.ingredients ?? []).join(' ').toLowerCase().includes(term)
      );
    }
    if (favOnly) list = list.filter(r => r.favorite);
    return list;
  });

  toggleFav(r: Recipe) {
    if (!r.id) return;
    this.api.toggleFavorite(r).subscribe({
      next: (updated) => {
        this.all.update(arr => arr.map(x => x.id === updated.id ? updated : x));
      },
      error: (err) => console.error('toggleFav failed', err)
    });
  }

  addRecipe() {
    this.router.navigate(['/recipes/new']);
  }

  openDetails(r: Recipe) {
    if (!r.id) return;
    this.router.navigate(['/recipes', r.id]);
  }
}
