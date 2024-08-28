import { Injectable } from '@angular/core';
import { QuestionBase } from './question-classes/question-base.class';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {

  toFormGroup(questions: QuestionBase<string>[] | null) {
    const group: any = {};
    if (!questions) {
      return new FormGroup(group);
    }

    questions.forEach((question) => {
      group[question.key] = question.required
        ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
