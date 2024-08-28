import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DynamicFormComponent } from "../shared/forms/dynamic-forms/dynamic-form/dynamic-form.component";
import { AsyncPipe } from '@angular/common';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatCardModule,
    DynamicFormComponent,
    AsyncPipe,
  ],
  exports: [
    MatCardModule,
    DynamicFormComponent,
    AsyncPipe,
  ]
})
export class UserModule { }
