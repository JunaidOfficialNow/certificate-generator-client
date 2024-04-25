import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import saveAs from 'file-saver';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-template-four-form',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatProgressSpinnerModule],
  template: `
     <form [formGroup]="form">
      <h3 class="mat-headline-5">Recognition certificate</h3>
     <mat-form-field appearance="fill">
      <mat-label>name</mat-label>
      <input formControlName="name" type="text" matInput>
      <mat-error>Name is required</mat-error>
     </mat-form-field>

     <mat-form-field appearance="fill">
      <mat-label>Workshop Coach</mat-label>
      <input formControlName="coach" type="text" matInput>
      <mat-error>This field is required</mat-error>
     </mat-form-field>

     <mat-form-field appearance="fill">
      <mat-label>Head of Event</mat-label>
      <input formControlName="head" type="text" matInput>
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
        } @else {
          Create certificate
        }
      </button>
      }
      </form>
  `,
})
export class TemplateFourFormComponent {
  fb = inject(FormBuilder);
  loading = false;
  download = false;
  name = '';

  form = this.fb.group({
    name: ['', Validators.required],
    coach: ['', Validators.required],
    head: ['', Validators.required],
  });

  http = inject(HttpClient);
  submitForm() {
    if (!this.form.valid) return this.form.markAllAsTouched(); 
    this.loading = true;
    this.name = this.form.value.name!;
    this.http
      .post(
        'http://localhost:8080/certificates/generate-recognition-certificate',
        {
          name: this.form.value.name,
          head: this.form.value.head,
          coach: this.form.value.coach,
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
