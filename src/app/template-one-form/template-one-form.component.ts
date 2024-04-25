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
import { MatDialogRef } from '@angular/material/dialog';
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
        <mat-label>Supervisor</mat-label>
        <input formControlName="supervisor" type="text" matInput />
      <mat-error>This field is required</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Manager</mat-label>
        <input name="naam" formControlName="manager" type="text" matInput />
      <mat-error>Manager is required</mat-error>
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
  matDialogRef = inject(MatDialogRef);
  loading = false;
  download = false;
  name = '';

  form = this.fb.group({
    name: ['', Validators.required],
    supervisor: ['', Validators.required],
    manager: ['', Validators.required],
  });

  http = inject(HttpClient);
  submitForm() {
    if (!this.form.valid)  return this.form.markAllAsTouched();
    this.loading = true;
    this.name = this.form.value.name!;
    this.http
      .post(
        'http://localhost:8080/certificates/generate-appreciation-certificate',
        { name: this.form.value.name, supervisor: this.form.value.supervisor, manager: this.form.value.manager }
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
        this.matDialogRef.close();
      })
  }
}
