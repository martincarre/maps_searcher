import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionBase } from '../../shared/forms/dynamic-forms/question-classes/question-base.class';
import { SignupFormService } from '../signup/signup-form.service';
import { StyleSection } from '../../shared/forms/dynamic-forms/question-classes/form-style-section.class';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  sufs = inject<SignupFormService>(SignupFormService);
  questions$: Observable<(QuestionBase<string> | StyleSection<any> )[]>;
  constructor() { 
    this.questions$ = this.sufs.getQuestions();
  }
}
