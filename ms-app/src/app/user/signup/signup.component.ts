import { Component, inject } from '@angular/core';
import { SignupFormService } from './signup-form.service';
import { QuestionBase } from '../../shared/forms/dynamic-forms/question-classes/question-base.class';
import { Observable } from 'rxjs';
import { StyleSection } from '../../shared/forms/dynamic-forms/question-classes/form-style-section.class';
import { UserModule } from '../user.module';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [UserModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  sufs = inject<SignupFormService>(SignupFormService);
  questions$: Observable<(QuestionBase<string> | StyleSection<any> )[]>;
  constructor() { 
    this.questions$ = this.sufs.getQuestions();
  }
}
