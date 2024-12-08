import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-animated-button',
  templateUrl: './animated-button.component.html',
  standalone: true,
  styleUrls: ['./animated-button.component.css']
})
export class AnimatedButtonComponent {
  @Input() disabled!: boolean;
  @Input() text!: string;

}
