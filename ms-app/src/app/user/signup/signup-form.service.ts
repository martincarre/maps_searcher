import { Injectable } from '@angular/core';
import { QuestionBase } from '../../shared/forms/dynamic-forms/question-classes/question-base.class';
import { of } from 'rxjs';
import { DropdownQuestion } from '../../shared/forms/dynamic-forms/question-classes/question-dropdown.class';
import { TextboxQuestion } from '../../shared/forms/dynamic-forms/question-classes/question-textbox.class';
import { StyleSection } from '../../shared/forms/dynamic-forms/question-classes/form-style-section.class';

@Injectable({
  providedIn: 'root'
})
export class SignupFormService {

  getQuestions() {
    const questions: (QuestionBase<string> | StyleSection<any>)[] = [ 
      new TextboxQuestion({ 
        key: 'name',
        label: 'Name',
        materialCss: 'outline',
        // required: true,
        order: 1
      }),
      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        type: 'email',
        materialCss: 'outline',
        // required: true,
        order: 2
      }),
      new TextboxQuestion({
        key: 'password',
        label: 'Password',
        type: 'password',
        materialCss: 'outline',
        // required: true,
        order: 3
      }),
      new TextboxQuestion({
        key: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        materialCss: 'outline',
        // required: true,
        order: 4
      }),
      new DropdownQuestion({
        key: 'role',
        label: 'Role',
        options: [
          { value: 'C-suite', key: 'csuite' },
          { value: 'Sales', key: 'sales' },
          { value: 'Marketing', key: 'marketing' },
          { value: 'Operations', key: 'operations' },
          { value: 'Finance', key: 'finance' },
          { value: 'Intern', key: 'intern' },
        ],
        order: 5,
        // required: true,
        materialCss: 'outline',
      }),
      new DropdownQuestion({
        key: 'businessType',
        label: 'Business Type',
        options: [
          { value: 'B2B', key: 'b2b' },
          { value: 'B2C', key: 'b2c' },
          { value: 'B2G', key: 'b2g' },
          { value: 'Nonprofit', key: 'nonprofit' },
        ],
        materialCss: 'outline'
      }),
      new TextboxQuestion({
        key: 'businessName',
        label: 'Business Name',
        order: 7,
        // required: true,
        materialCss: 'outline'
      }),
      new TextboxQuestion({
        key: 'businessWebsite',
        label: 'Business Website',
        order: 8,
        materialCss: 'outline',
      }),
      new StyleSection({
        order: 2,
        content: 'Business Information',
        title: 'Business Information',
      })
    ]
    return of(questions.sort((a, b) => a.order - b.order));
  }
}
