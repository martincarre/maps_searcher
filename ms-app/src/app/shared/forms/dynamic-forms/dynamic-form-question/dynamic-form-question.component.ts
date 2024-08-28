import { Component, input } from '@angular/core';
import { QuestionBase } from '../question-classes/question-base.class';
import { FormGroup } from '@angular/forms';
import { DynamicFormsModule } from '../../dynamic-forms.module';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [ DynamicFormsModule ],
  templateUrl: './dynamic-form-question.component.html',
  styleUrl: './dynamic-form-question.component.css'
})
export class DynamicFormQuestionComponent {
  question = input.required<QuestionBase<string>>();
  form = input.required<FormGroup>();
  get isValid() { 
    return this.form().controls[this.question().key].valid;
  }
}
