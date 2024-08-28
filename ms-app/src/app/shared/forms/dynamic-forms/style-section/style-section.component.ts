import { Component, input } from '@angular/core';
import { StyleSection } from '../question-classes/form-style-section.class';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-style-section',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './style-section.component.html',
  styleUrl: './style-section.component.css'
})
export class StyleSectionComponent {
  section = input.required<StyleSection<any>>();
}
