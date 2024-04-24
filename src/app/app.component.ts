import { Component, ElementRef, ViewChild, signal } from '@angular/core';
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
  template: `
    <div class="drip">
      <svg
        width="1200px"
        height="140px"
        viewBox="0 20 2129 257"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <title>small_d2</title>
        <g
          class="Bannerbear"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g class="Artboard" transform="translate(-848.000000, -1091.000000)">
            <g class="small_d2" transform="translate(848.000000, 1091.000000)">
              <rect
                class="Rectangle"
                fill-opacity="0"
                fill="#FFFFFF"
                x="0"
                y="0"
                width="2129"
                height="257"
              ></rect>
              <path
                d="M2071.67,0.166088806 L2071.67,10.91 L2004,10.91 C1961.17,10.91 1847.78,91.56 1749,79.41 C1682.13,71.19 1624.67,42.6 1532,41.41 C1397.64,39.71 1267.63,169.75 1134.72,168.96 C1008.72,168.21 936.06,89.29 812.29,65.5 C698.59,43.65 551,90.75 431,91.85 C315.2,92.92 256.67,10.91 123.72,10.91 L57,10.91 L57,0.166088806 L2071.67,0.166088806 Z"
                class="filling"
                fill="#F3C832"
                fill-rule="nonzero"
              ></path>
              <path
                d="M57,10.91 L123.72,10.91 C256.72,10.91 315.2,92.91 431.01,91.85 C551.01,90.75 698.59,43.65 812.31,65.52 C936.08,89.31 1008.72,168.23 1134.74,168.98 C1267.65,169.77 1397.66,39.73 1532.02,41.43 C1624.67,42.6 1682.13,71.19 1749.02,79.43 C1847.8,91.58 1961.19,10.93 2004.02,10.93 L2071.69,10.93"
                class="border"
                stroke="#000000"
                stroke-width="9"
                stroke-linecap="round"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    </div>
    <div class="header">
      <h1 class="mat-headline-2">Create your certificate</h1>
      <h3 class="mat-headline-6">
        Select a template, enter details and generate!
      </h3>
    </div>

    <div class="templates">
      <img
        src="./assets/1.png"
        (click)="selectTemplate(1)"
        [ngClass]="{ active: selected() === 1 }"
        alt=""
        class="template"
      />
      <img
        src="./assets/2.png"
        (click)="selectTemplate(2)"
        [ngClass]="{ active: selected() === 2 }"
        alt=""
        class="template"
      />
      <img
        src="./assets/3.png"
        (click)="selectTemplate(3)"
        [ngClass]="{ active: selected() === 3 }"
        alt=""
        class="template"
      />
      <img
        src="./assets/4.png"
        (click)="selectTemplate(4)"
        [ngClass]="{ active: selected() === 4 }"
        alt=""
        class="template"
      />
    </div>
    <div #formArea class="form-wrapper">
      <div class="form-area">
        @switch (selected()) { @case (1) {
        <app-template-one-form />
        } @case (2) {
        <app-template-two-form />
        } @case (3) {
        <app-template-three-form />
        } @case (4) {
        <app-template-four-form />
        } }
      </div>
    </div>
    <div class="footer">
      <h3 class="mat-headline-6"> &#169;Certificate Generator</h3>
    </div>
  `,
  styles: `
   h3 {
    margin-bottom:0rem !important;
   }
  .footer {
    height: 8vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    border-top: 2px solid;
    background-color: #FFd700;
  }

  .active {
    border: 2px solid;
    border-radius: 2px;
    transform: scale(1.1);
    transition: 0.2s ease-out;
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
    border-radius: 15px;
    width:40%;
    padding: 2rem;
  }
  .templates {
    display:  grid;
    gap: 2rem; 
    justify-content: center;
    margin-top: 2rem;
  }
  .template {
     width: 13rem;
     height: 9rem;
  }
    h1 {
      margin-bottom: 2rem!important;
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
  @ViewChild('formArea') formArea!: ElementRef;

  selectTemplate(id: number) {
    this.selected.set(id);
    this.formArea.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }
}
