import {Component, inject, input, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup} from '@angular/forms';
import { DynamicFormQuestionComponent } from '../dynamic-form-question/dynamic-form-question.component';
import { QuestionControlService } from '../question-control.service';
import { QuestionBase } from '../question-classes/question-base.class';
import { DynamicFormsModule } from '../../dynamic-forms.module';
import { StyleSection } from '../question-classes/form-style-section.class';
import { StyleSectionComponent } from '../style-section/style-section.component';

@Component({
  standalone: true,
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService],
  imports: [CommonModule, DynamicFormQuestionComponent, DynamicFormsModule, StyleSectionComponent],
})

export class DynamicFormComponent implements OnInit {
  private qcs = inject<QuestionControlService>(QuestionControlService);
  questions = input<(QuestionBase<string>| StyleSection<any>)[] | null>([]);
  form!: FormGroup;
  payLoad = '';

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions());
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

  isStyleSection(question: QuestionBase<string> | StyleSection<any>): question is StyleSection<any> {
    return question instanceof StyleSection;
  }

  isQuestionSection(question: QuestionBase<string> | StyleSection<any>): boolean {
    return question instanceof QuestionBase;
  }
}