import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionBase } from '../../shared/forms/dynamic-forms/question-classes/question-base.class';
import { StyleSection } from '../../shared/forms/dynamic-forms/question-classes/form-style-section.class';
import { UserModule } from '../user.module';
import { LoginFormService } from './login-form.service';
import { FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [UserModule, MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  lfs = inject<LoginFormService>(LoginFormService);
  userService = inject<UserService>(UserService);

  questions$: Observable<(QuestionBase<string> | StyleSection<any> )[]>;
  constructor() { 
    this.questions$ = this.lfs.getQuestions();
  }

  onLogin($event: FormGroup) {
    this.userService.login($event.value.email, $event.value.password);
  }
}
