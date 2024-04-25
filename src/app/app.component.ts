import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { TemplateOneFormComponent } from './template-one-form/template-one-form.component';
import { NgClass } from '@angular/common';
import { TemplateTwoFormComponent } from './template-two-form/template-two-form.component';
import { TemplateThreeFormComponent } from './template-three-form/template-three-form.component';
import { TemplateFourFormComponent } from './template-four-form/template-four-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TemplateOneFormComponent,
    NgClass,
    TemplateTwoFormComponent,
    TemplateThreeFormComponent,
    TemplateFourFormComponent,
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  selected = signal(1);
  @ViewChild('formArea') formArea!: ElementRef;


  selectTemplate(id: number) {
    this.selected.set(id);
  }
}
