import { Component, inject, runInInjectionContext } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-template-one-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  template: `
    <form [formGroup]="form">
      <h3 class="mat-headline-5">Appreciation certificate</h3>
      <mat-form-field >
        <mat-label>name</mat-label>
        <input name="naam" formControlName="name" type="text" matInput />
      <mat-error>Name is required</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Representative 1</mat-label>
        <input formControlName="repre1" type="text" matInput />
      <mat-error>This field is required</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Representative 2</mat-label>
        <input name="naam" formControlName="repre2" type="text" matInput />
      <mat-error>Instructor is required</mat-error>
      </mat-form-field>

      @if (download) {
        <button mat-raised-button color="primary" (click)="downloadPdf()">
        Download certificate
      </button>
      } @else {
        <button mat-stroked-button color="primary" (click)="submitForm()">
        @if(loading) {
         <span>
           <mat-spinner diameter="30" color=""></mat-spinner>
         </span> 
        } @else {
          Create certificate
        }
      </button>
      }

    </form>
  `,
})
export class TemplateOneFormComponent {
  fb = inject(FormBuilder);
  loading = false;
  download = false;
  name = '';

  form = this.fb.group({
    name: ['', Validators.required],
    repre1: ['', Validators.required],
    repre2: ['', Validators.required],
  });

  http = inject(HttpClient);
  submitForm() {
    if (!this.form.valid)  return this.form.markAllAsTouched();
    this.loading = true;
    this.name = this.form.value.name!;
    this.http
      .post(
        'http://localhost:8080/certificates/generate-appreciation-certificate',
        { name: this.form.value.name, representative1: this.form.value.repre1, representative2: this.form.value.repre2 }
      )
      .subscribe(() => {
        this.loading = false;
        this.download = true;
      });
  }

  downloadPdf() {
    this.http
      .get(
        'http://localhost:8080/certificates/download/' + this.name,
        { responseType: 'blob' }
      )
      .subscribe((data: Blob) => {
        (saveAs(data), this.download = false);
        this.form.reset()
      })
  }
}
