import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { TemplateOneFormComponent } from './template-one-form/template-one-form.component';
import { NgClass } from '@angular/common';
import { TemplateTwoFormComponent } from './template-two-form/template-two-form.component';
import { TemplateThreeFormComponent } from './template-three-form/template-three-form.component';
import { TemplateFourFormComponent } from './template-four-form/template-four-form.component';
import { MatDialog , MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TemplateOneFormComponent,
    NgClass,
    TemplateTwoFormComponent,
    TemplateThreeFormComponent,
    TemplateFourFormComponent,
    MatDialogModule
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  selected = signal(1);
  @ViewChild('formArea') formArea!: ElementRef;

  matDialog = inject(MatDialog)

  selectTemplate(id: number) {
    this.selected.set(id);
    switch(this.selected()) {
      case 1:
        this.matDialog.open(TemplateOneFormComponent);
        break
      case 2:
        this.matDialog.open(TemplateTwoFormComponent);
        break;
      case 3:
        this.matDialog.open(TemplateThreeFormComponent);
        break;
      case 4:
        this.matDialog.open(TemplateFourFormComponent);
        break;
    }
  }
}
