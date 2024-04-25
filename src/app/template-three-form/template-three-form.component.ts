import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
     <mat-form-field appearance="fill">
      <mat-label>name</mat-label>
      <input formControlName="name" type="text" matInput>
      <mat-error>Name is required</mat-error>
     </mat-form-field>

     <mat-form-field appearance="fill">
      <mat-label>Founder</mat-label>
      <input formControlName="founder" type="text" matInput>
      <mat-error>description is required</mat-error>
     </mat-form-field>

     <mat-form-field appearance="fill">
      <mat-label>Manager</mat-label>
      <input formControlName="manager" type="text" matInput>
      <mat-error>year is required</mat-error>
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
})
export class TemplateThreeFormComponent {
  fb = inject(FormBuilder);
  loading = false;
  download = false;
  name = '';

  form = this.fb.group({
    name: ['', Validators.required],
    founder: ['', Validators.required],
    manager: ['', Validators.required],
  });

  http = inject(HttpClient);
  submitForm() {
    if (!this.form.valid) return this.form.markAllAsTouched();
    this.loading = true;
    this.name = this.form.value.name!;
    this.http
      .post(
        'http://localhost:8080/certificates/generate-completion-certificate',
        {
          name: this.form.value.name,
          founder: this.form.value.founder,
          manager: this.form.value.manager,
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
