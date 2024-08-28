import { Component, inject, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DynamicFormComponent } from "../../shared/forms/dynamic-forms/dynamic-form/dynamic-form.component";
import { SignupFormService } from './signup-form.service';
import { QuestionBase } from '../../shared/forms/dynamic-forms/question-classes/question-base.class';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { StyleSection } from '../../shared/forms/dynamic-forms/question-classes/form-style-section.class';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatCardModule, DynamicFormComponent, AsyncPipe],
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
