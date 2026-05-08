import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LinkedIn } from '@fe/shared';

import { type Image, type Link } from '@shared';

export interface EmployeeCardContent {
  id: string;
  name: string;
  position: string;
  description: string;
  photo: Image;
  socialLink: Link;
}

@Component({
  selector: 'lib-employee-card',
  standalone: true,
  imports: [LinkedIn],
  templateUrl: './employee-card.html',
  styleUrl: './employee-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCard {
  content = input<EmployeeCardContent | null>();
}
