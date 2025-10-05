import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiInfo } from '../core/api-info';
import { Recipe } from '../core/models';

@Component({
  selector: 'app-recipe-details',
  imports: [RouterModule],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.scss'
})
export class RecipeDetails implements OnInit{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(ApiInfo);

  recipe = signal<Recipe | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error.set('Invalid recipe id.');
      this.loading.set(false);
      return;
    }
    this.api.getById(id).subscribe({
      next: r => { this.recipe.set(r); this.loading.set(false); },
      error: () => { this.error.set('Recipe not found.'); this.loading.set(false); }
    });
  }

  delete() {
    const r = this.recipe();
    if (!r?.id) return;
    if (!confirm('Delete this recipe?')) return;
    this.api.delete(r.id).subscribe(() => this.router.navigate(['/']));
  }
}
