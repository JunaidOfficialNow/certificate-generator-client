import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-one-form',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
  template: `
     <form action="">
     <mat-form-field appearance="outline">
      <mat-label>name</mat-label>
      <input type="text" matInput>
     </mat-form-field>

     <mat-form-field appearance="outline">
      <mat-label>name</mat-label>
      <input type="text" matInput>
     </mat-form-field>

     <mat-form-field appearance="outline">
      <mat-label>name</mat-label>
      <input type="text" matInput>
     </mat-form-field>

     <mat-form-field appearance="outline">
      <mat-label>name</mat-label>
      <input type="text" matInput>
     </mat-form-field>
     </form>
  `,
  styles: `
  mat-form-field, form {
    width: 100%
  }
  `
})
export class TemplateOneFormComponent {

}
