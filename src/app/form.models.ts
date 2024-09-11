import { FormControl, FormGroup } from "@angular/forms";

export interface RootForm {
  name: FormControl<string | null>;

  a_group: FormGroup<FormA>;

  b_group?: FormGroup<FormB>;
}

export interface FormA {
  name: FormControl<string>;
}

export interface FormB {
  name: FormControl<string | null>;
}
