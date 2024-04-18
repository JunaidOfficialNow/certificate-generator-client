import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import saveAs from 'file-saver';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-template-two-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <form [formGroup]="form">
      <h3 class="mat-headline-5">Achievement certificate</h3>
      <mat-form-field appearance="outline">
        <mat-label>name</mat-label>
        <input formControlName="name" type="text" matInput />
        <mat-error>Name is required</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>representative 1</mat-label>
        <input formControlName="representative1" type="text" matInput />
        <mat-error>This field is required</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>representative 2</mat-label>
        <input formControlName="representative2" type="text" matInput />
        <mat-error>This field is required</mat-error>
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
        } @else { Create certificate }
      </button>
      }
    </form>
  `,
  styles: `
  mat-form-field, form {
    width: 100%
  }
  `,
})
export class TemplateTwoFormComponent {
  fb = inject(FormBuilder);
  loading = false;
  download = false;
  name = '';
  form = this.fb.group({
    name: ['', Validators.required],
    representative1: ['', Validators.required],
    representative2: ['', Validators.required],
  });

  http = inject(HttpClient);
  submitForm() {
  if (!this.form.valid) return this.form.markAsDirty();
    this.loading = true;
    this.name = this.form.value.name!;
    this.http
      .post(
        'http://localhost:8080/certificates/generate-achievement-certificate',
        {
          name: this.form.value.name,
          representative1: this.form.value.representative1,
          representative2: this.form.value.representative2,
        }
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
      .subscribe((data: Blob) => (saveAs(data), (this.download = false), this.form.reset()));
  }
}
