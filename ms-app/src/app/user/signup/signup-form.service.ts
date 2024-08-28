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
      new StyleSection({
        order: 1,
        content: 'So that we get to know you better',
        title: 'Personal Information',
        divider: true,
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
          { value: 'Student', key: 'student' },          
        ],
        order: 2,
        // required: true,
        materialCss: 'outline',
      }),
      new TextboxQuestion({ 
        key: 'name',
        label: 'Name',
        materialCss: 'outline',
        // required: true,
        order: 3,
        suffix: 'badge'
      }),
      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        type: 'email',
        materialCss: 'outline',
        // required: true,
        order: 3,
        suffix: 'email',
      }),
      new StyleSection({
        order: 4,
        content: 'Define a password for your account',
      }),
      new TextboxQuestion({
        key: 'password',
        label: 'Password',
        type: 'password',
        materialCss: 'outline',
        // required: true,
        order: 5,
        suffix: 'password'
      }),
      new TextboxQuestion({
        key: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        materialCss: 'outline',
        // required: true,
        order: 6,
        suffix: 'password'
      }),
      new StyleSection({
        order: 7,
        content: 'Tell us about your business',
        title: 'Business Information',
        divider: true
      }),
      new DropdownQuestion({
        key: 'businessType',
        label: 'Business Type',
        options: [
          { value: 'B2B', key: 'b2b' },
          { value: 'B2C', key: 'b2c' },
          { value: 'B2G', key: 'b2g' },
          { value: 'School', key: 'school'},
          { value: 'Government', key: 'government' },
          { value: 'Non-profit', key: 'nonprofit' },
        ],
        materialCss: 'outline',
        order: 8,
      }),
      new TextboxQuestion({
        key: 'businessName',
        label: 'Business Name',
        order: 9,
        // required: true,
        materialCss: 'outline',
        suffix: 'work'
      }),
      new TextboxQuestion({
        key: 'businessWebsite',
        label: 'Business Website',
        order: 10,
        materialCss: 'outline',
        suffix: 'language'
      }),
      new StyleSection({
        order: 11,
        content: 'Tell us how you\'re going to use our platform',
      }),
      new DropdownQuestion({
        key: 'useCase',
        label: 'Use Case',
        options: [
          { value: 'To find new customers', key: 'new_customers' },
          { value: 'To know about my competition', key: 'competition' },
          { value: 'Research for a paper or an assignment', key: 'research' },
          { value: 'General market research', key: 'market_research' },
          { value: 'Other', key: 'other' },
        ],
        order: 12,
        materialCss: 'outline',
      }),
    ]
    return of(questions.sort((a, b) => a.order - b.order));
  }
}
