import { Injectable } from '@angular/core';
import { QuestionBase } from '../../shared/forms/dynamic-forms/question-classes/question-base.class';
import { of } from 'rxjs';
import { DropdownQuestion } from '../../shared/forms/dynamic-forms/question-classes/question-dropdown.class';
import { TextboxQuestion } from '../../shared/forms/dynamic-forms/question-classes/question-textbox.class';
import { StyleSection } from '../../shared/forms/dynamic-forms/question-classes/form-style-section.class';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService {

  getQuestions() {
    const questions: (QuestionBase<string> | StyleSection<any>)[] = [ 
      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        type: 'email',
        materialCss: 'outline',
        // required: true,
        order: 1,
        suffix: 'email',
      }),
      new TextboxQuestion({
        key: 'password',
        label: 'Password',
        type: 'password',
        materialCss: 'outline',
        // required: true,
        order: 2,
        suffix: 'password'
      }),
    ]
  }
}
