import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiInfo } from '../core/api-info';
import { Recipe } from '../core/models';

@Component({
  selector: 'app-recipe-form',
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss'
})
export class RecipeForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(ApiInfo);

  editingId?: number;
  imagePreview: string | null = null;

  form: FormGroup = this.fb.group({
    title: this.fb.control<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    shortDescription: this.fb.control<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(140)] }),
    ingredients: this.fb.array<FormControl<string>>(
      [this.fb.control<string>('', { nonNullable: true, validators: [Validators.required] })],
      { validators: [Validators.minLength(1)] }
    ),
    instructions: this.fb.control<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
    imageUrl: this.fb.control<string>('', { nonNullable: true, validators: [Validators.required] }),
    favorite: this.fb.control<boolean>(false, { nonNullable: true })
  });

  get ings() { return this.form.get('ingredients') as FormArray<FormControl<string>>; }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editingId = Number(id);
      this.api.getById(this.editingId).subscribe(r => this.patch(r));
    }
  }

  addIng() { this.ings.push(this.fb.control<string>('', { nonNullable: true, validators: [Validators.required] })); }
  rmIng(i: number) { this.ings.removeAt(i); }

  private patch(r: Recipe) {
    this.form.patchValue({
      title: r.title,
      shortDescription: r.shortDescription,
      instructions: r.instructions,
      imageUrl: r.imageUrl,
      favorite: r.favorite
    });
    this.imagePreview = r.imageUrl || null;

    this.ings.clear();
    r.ingredients.forEach(x =>
      this.ings.push(this.fb.control<string>(x, { nonNullable: true, validators: [Validators.required] }))
    );
  }

  onImageFile(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      this.form.get('imageUrl')!.setValue(dataUrl);
      this.imagePreview = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value: Recipe = {
      ...this.form.getRawValue(),
      ingredients: this.ings.value
    };

    const req = this.editingId
      ? this.api.update(this.editingId, { id: this.editingId, ...value })
      : this.api.create(value);

    req.subscribe(saved => this.router.navigate(['/recipes', saved.id]));
  }
}
