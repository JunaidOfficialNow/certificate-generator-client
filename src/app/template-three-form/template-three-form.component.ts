import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import saveAs from 'file-saver';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-template-three-form',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatProgressSpinnerModule],
  template: `
     <form [formGroup]="form">
      <h3 class="mat-headline-5">Completion certificate</h3>
     <mat-form-field appearance="outline">
      <mat-label>name</mat-label>
      <input formControlName="name" type="text" matInput>
     </mat-form-field>

     <mat-form-field appearance="outline">
      <mat-label>description</mat-label>
      <input formControlName="description" type="text" matInput>
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

  `,
  styles: `
  mat-form-field, form {
    width: 100%
  }
  `
})
export class TemplateThreeFormComponent {
  fb = inject(FormBuilder);
  loading = false;
  download = false;
  name = '';

  form = this.fb.group({
    name: '',
    description: '',
  });

  http = inject(HttpClient);
  submitForm() {
    this.loading = true;
    this.name = this.form.value.name!;
    this.http
      .post(
        'http://localhost:8080/certificates/generate-completion-certificate',
        {
          name: this.form.value.name,
          description: this.form.value.description,
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
