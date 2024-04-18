import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import saveAs from 'file-saver';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-template-four-form',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatProgressSpinnerModule],
  template: `
     <form [formGroup]="form">
      <h3>Recognition certificate</h3>
     <mat-form-field appearance="outline">
      <mat-label>name</mat-label>
      <input formControlName="name" type="text" matInput>
     </mat-form-field>

     <mat-form-field appearance="outline">
      <mat-label>month</mat-label>
      <input formControlName="month" type="text" matInput>
     </mat-form-field>

     <mat-form-field appearance="outline">
      <mat-label>year</mat-label>
      <input formControlName="year" type="text" matInput>
     </mat-form-field>

     <mat-form-field appearance="outline">
      <mat-label>supervisor</mat-label>
      <input formControlName="supervisor" type="text" matInput>
     </mat-form-field>

     <mat-form-field appearance="outline">
      <mat-label>manager</mat-label>
      <input formControlName="manager" type="text" matInput>
     </mat-form-field>
     </form>

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
export class TemplateFourFormComponent {
  fb = inject(FormBuilder);
  loading = false;
  download = false;

  form = this.fb.group({
    name: '',
    month: '',
    year: '',
    supervisor: '',
    manager: ''
  });

  http = inject(HttpClient);
  submitForm() {
    this.loading = true;
    this.http
      .post(
        'http://localhost:8080/certificates/generate-recognition-certificate',
        {
          name: this.form.value.name,
          month: this.form.value.month,
          year: this.form.value.year,
          supervisor: this.form.value.supervisor,
          manager: this.form.value.manager
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
        'http://localhost:8080/certificates/download/' + this.form.value.name,
        { responseType: 'blob' }
      )
      .subscribe((data: Blob) => (saveAs(data), (this.download = false)));
  }

}
