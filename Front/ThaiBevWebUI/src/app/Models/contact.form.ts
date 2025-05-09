import { FormControl } from '@angular/forms';

export interface ContactForm {
  FirstName: FormControl<string>;
  LastName: FormControl<string>;
  Email: FormControl<string>;
  Phone: FormControl<string>;
  BirthDay: FormControl<string>;
  Occupation: FormControl<string>;
  Sex: FormControl<string>;
  Profile: FormControl<File | null>;
};
