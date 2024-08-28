import {Component, inject, input, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import { DynamicFormQuestionComponent } from '../dynamic-form-question/dynamic-form-question.component';
import { QuestionControlService } from '../question-control.service';
import { QuestionBase } from '../question-classes/question-base.class';
import { DynamicFormsModule } from '../../dynamic-forms.module';

@Component({
  standalone: true,
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService],
  imports: [CommonModule, DynamicFormQuestionComponent, DynamicFormsModule],
})

export class DynamicFormComponent implements OnInit {
  private qcs = inject<QuestionControlService>(QuestionControlService);
  questions = input<QuestionBase<string>[] | null>([]);
  form!: FormGroup;
  payLoad = '';

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions());
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}