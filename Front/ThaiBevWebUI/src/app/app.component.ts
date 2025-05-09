import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormComponent],
  template: `<app-form></app-form>`, // ใช้ FormComponent เป็น child component
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ThaiBevWebUI';
}