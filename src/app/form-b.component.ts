import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormB, RootForm } from './form.models';

@Component({
  selector: 'app-form-b',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  template: `
  <ng-container [formGroup]="rootGroup" >
    <div formGroupName="b_group">
      <input formControlName="name" placeholder="B name">
    </div>
  </ng-container>
  `,
})
export class FormBComponent implements OnInit {

  rootGroup!: FormGroup<RootForm>;
  bGroup!: FormGroup<FormB>;

  fgd = inject(FormGroupDirective);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.rootGroup = this.fgd.form;

    this.bGroup = this.fb.group<FormB>({
      name: this.fb.control(null, [Validators.required]),
    });

    this.rootGroup.addControl('b_group', this.bGroup);
  }
}
