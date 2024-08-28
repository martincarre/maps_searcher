import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionBase } from '../../shared/forms/dynamic-forms/question-classes/question-base.class';
import { StyleSection } from '../../shared/forms/dynamic-forms/question-classes/form-style-section.class';
import { UserModule } from '../user.module';
import { LoginFormService } from './login-form.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [UserModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  sufs = inject<LoginFormService>(LoginFormService);
  questions$: Observable<(QuestionBase<string> | StyleSection<any> )[]>;
  constructor() { 
    this.questions$ = this.sufs.getQuestions();
  }
}
