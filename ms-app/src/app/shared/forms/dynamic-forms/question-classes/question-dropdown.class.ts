import {QuestionBase} from './question-base.class';

export class DropdownQuestion extends QuestionBase<string> {
  override controlType = 'dropdown';
}