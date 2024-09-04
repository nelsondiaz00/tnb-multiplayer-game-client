import { Component } from '@angular/core';
import { AttributeComponent } from '../attribute/attribute.component';
import { HabilityComponent } from '../hability/hability.component';
@Component({
  selector: 'app-action-bar',
  standalone: true,
  imports: [AttributeComponent, HabilityComponent],
  templateUrl: './action-bar.component.html',
  styleUrl: './action-bar.component.css',
})
export class ActionBarComponent {}
