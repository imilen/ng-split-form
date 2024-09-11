import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, input } from '@angular/core';
import { FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormA, RootForm } from './form.models';

@Component({
  selector: 'app-form-a',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormAComponent],
  template: `
    <ng-container [formGroup]="childGroup">
        <input formControlName="name" placeholder="A name">
    </ng-container>
    `,
})
export class FormAComponent implements OnInit {
  rootGroup!: FormGroup<RootForm>;
  childGroup!: FormGroup<FormA>;

  fgd = inject(FormGroupDirective);

  formGroupName = input.required<string>();

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.rootGroup = this.fgd.form;

    this.childGroup = this.fgd.control.get(this.formGroupName()) as FormGroup<FormA>;

    // this.childGroup = this.rootGroup.controls.a_group;
  }

}
