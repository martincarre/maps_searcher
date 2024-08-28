import { Injectable } from '@angular/core';
import { QuestionBase } from './question-classes/question-base.class';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StyleSection } from './question-classes/form-style-section.class';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {

  toFormGroup(questions: (QuestionBase<string> | StyleSection<any>)[] | null) {
    const group: any = {};
    if (!questions) {
      return new FormGroup(group);
    }

    questions.forEach((question) => {
      if (question instanceof StyleSection) { 
        return; 
      }
      group[question.key] = question.required
        ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
