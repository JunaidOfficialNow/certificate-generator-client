import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
  <div class="header">
    <h1>Create your  certificate</h1>
     <h3>Select a template, enter details and generate!</h3>
  </div>

  <div class="templates">
    <img src="./assets/sample.jpg" alt="" class="template">
    <img src="./assets/sample.jpg" alt="" class="template">
    <img src="./assets/sample.jpg" alt="" class="template">
    <img src="./assets/sample.jpg" alt="" class="template">
  </div>
  `,
  styles: `
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
  `
})
export class AppComponent {}
