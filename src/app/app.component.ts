import { Component, signal } from '@angular/core';
import { TemplateOneFormComponent } from './template-one-form/template-one-form.component';
import { NgClass } from '@angular/common';
import { TemplateTwoFormComponent } from './template-two-form/template-two-form.component';
import { TemplateThreeFormComponent } from './template-three-form/template-three-form.component';
import { TemplateFourFormComponent } from './template-four-form/template-four-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TemplateOneFormComponent, NgClass, TemplateTwoFormComponent, TemplateThreeFormComponent, TemplateFourFormComponent],
  template: `
    <div class="header">
      <h1>Create your certificate</h1>
      <h3>Select a template, enter details and generate!</h3>
    </div>

    <div class="templates">
      <img src="./assets/sample.jpg" (click)="selected.set(1)" [ngClass]="{'active': selected() === 1}" alt="" class="template" />
      <img src="./assets/2.png" (click)="selected.set(2)" [ngClass]="{'active': selected() === 2}" alt="" class="template" />
      <img src="./assets/3.png" (click)="selected.set(3)" [ngClass]="{'active': selected() === 3}" alt="" class="template" />
      <img src="./assets/4.png" (click)="selected.set(4)" [ngClass]="{'active': selected() === 4}" alt="" class="template" />
    </div>
    <div class="form-wrapper">
      <div class="form-area">

      @switch (selected()) {
        @case (1) {
          <app-template-one-form />
        }
        @case (2) {
          <app-template-two-form/>
        }
        @case (3) {
          <app-template-three-form/>
        }

        @case (4) {
          <app-template-four-form/>
        }
      }
      </div>
    </div>
  `,
  styles: `

  .active {
    border: 4px solid blue;
  }

.form-wrapper {
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
  .form-area {
    border: 2px solid;
    width:40%;
    padding: 2rem;
  }
  .templates {
    display:  flex;
    gap: 2rem; 
    justify-content: center;
    margin-top: 2rem;
  }
  .template {
     width: 13rem;
     height: 9rem;
  }
    h1 {
      font-weight: 700;
      font-size: 44px;
      margin-bottom: 0;

    }
    .header {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `,
})
export class AppComponent {
  selected = signal(1);
}
