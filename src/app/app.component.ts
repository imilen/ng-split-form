import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormAComponent } from './form-a.component';
import { FormBComponent } from './form-b.component';
import { FormA, RootForm } from './form.models';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormAComponent, FormBComponent],
  template: `
  <form [formGroup]="formGroup" (submit)="onSubmit()">
    <div style="display: flex; flex-direction: column; gap: 16px; width: fit-content;">

      <input formControlName="name" placeholder="Name">
      <app-form-a formGroupName="a_group" />
      <app-form-b />
      <button style="width: max-content; align-self: center;" type="submit">Submit</button>

    </div>
    <p>valid: {{ formGroup.valid }}</p>
    <p>status: {{ formGroup.status }}</p>
    <pre>{{ this.formValue() | json }}</pre>
  </form>
  `,
})
export class AppComponent {

  title = 'ng-split-form';

  fb = inject(FormBuilder);

  formGroup!: FormGroup<RootForm>;

  formValue;

  constructor() {

    this.initForm();

    this.formValue = toSignal(
      this.formGroup.valueChanges
    );

    effect(() =>
      console.log(this.formValue())
    )
  }

  initForm() {
    this.formGroup = this.fb.group<RootForm>({
      name: this.fb.control(''),

      a_group: this.fb.group<FormA>({
        name: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      })
    }, { updateOn: 'change' });
  }

  onSubmit() {
    this.formGroup.updateValueAndValidity();
  }

}
