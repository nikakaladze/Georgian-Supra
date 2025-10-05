import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './models';

@Injectable({
  providedIn: 'root'
})
export class ApiInfo {
  private http = inject(HttpClient);
  private base = 'http://localhost:3000/recipes';

  public getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.base);
  }

  public getById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.base}/${id}`);
  }

  public search(q: string): Observable<Recipe[]> {
    const url = q ? `${this.base}?q=${encodeURIComponent(q)}` : this.base;
    return this.http.get<Recipe[]>(url);
  }

  public create(body: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.base, body)
  }

  public update(id: number, body: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.base}/${id}`, body)
  }

  public delete(id: number) {
    return this.http.delete(`${this.base}/${id}`)
  }
  public toggleFavorite(r: Recipe) {
    const id = r.id!;
    return this.http.patch<Recipe>(`${this.base}/${id}`, { favorite: !r.favorite })
  }
}
