import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API_URL } from '../app.config';
import { ContactForm } from '../Models/contact.form';
import { ContactResponse } from '../Models/contact.response';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, AsyncPipe],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  protected form: FormGroup<ContactForm> = new FormGroup<ContactForm>({
    FirstName: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    LastName: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    Email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    Phone: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^0[689]\d{8}$/)],
    }),
    BirthDay: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    Occupation: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    Sex: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    Profile: new FormControl<File | null>(null, [Validators.required]),
  });

  showAlert: boolean = false;
  rowId: string = '';
  http = inject(HttpClient);
  apiUrl = inject(API_URL);
  validatePhoneInput(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Delete',
    ];
    if (!allowedKeys.includes(event.key) && !/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }
  onSubmit(): void {
    if (this.form.valid) {
      const formData = new FormData();
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key);
        if (control) {
          if (key === 'Profile') {
            formData.append(key, control.value as File);
          } else {
            formData.append(key, control.value);
          }
        }
      });
      console.log('Form data:', formData);
      this.http
        .post<ContactResponse>(`${this.apiUrl}/Contact`, formData)
        .subscribe({
          next: (response) => {
            this.rowId = response.id;
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false;
              this.rowId = '';
            }, 5000);
            this.form.reset();
            if (this.fileInput) {
              this.fileInput.nativeElement.value = '';
            }
          },
          error: (error) => {
            console.error('Error saving data:', error);
          },
        });
    } else {
      console.log('Form is invalid');
    }
  }
  onClear(): void {
    this.form.reset();
    console.log(this.fileInput);
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
    this.showAlert = false;
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log(input);
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (!file.type.startsWith('image/')) {
        this.form.controls.Profile.setErrors({ invalidFileType: true });
      } else {
        this.form.controls.Profile.setValue(file);
        this.form.controls.Profile.setErrors(null);
      }
    } else {
      this.form.controls.Profile.setValue(null);
      this.form.controls.Profile.setErrors({ required: true });
    }
  }
  onFileFocus(): void {
    this.form.controls.Profile.markAsTouched();
  }
}
