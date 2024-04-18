import { Component, inject, runInInjectionContext } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  FormBuilder,
  ReactiveFormsModule,
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
      <h3>Participation certificate</h3>
      <mat-form-field appearance="outline">
        <mat-label>name</mat-label>
        <input name="naam" formControlName="name" type="text" matInput />
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
  styles: `
  mat-form-field, form {
    width: 100%
  }
  `,
})
export class TemplateOneFormComponent {
  fb = inject(FormBuilder);
  loading = false;
  download = false;

  form = this.fb.group({
    name: '',
  });

  http = inject(HttpClient);
  submitForm() {
    this.loading = true;
    this.http
      .post(
        'http://localhost:8080/certificates/generate-participation-certificate',
        { name: this.form.value.name }
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
      .subscribe((data: Blob) => (saveAs(data), this.download = false));
  }
}
