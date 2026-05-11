import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CustomButton, Heading } from '@fe/shared';

import { type Button } from '@shared';

import {
  EmployeeCard,
  type EmployeeCardContent,
} from './employee-card/employee-card';

export interface TeamSectionContent {
  title: string;
  description: string;
  button: Button;
  employees: EmployeeCardContent[];
}

@Component({
  selector: 'lib-team-section',
  standalone: true,
  imports: [Heading, EmployeeCard, CustomButton],
  templateUrl: './team-section.html',
  styleUrl: './team-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamSectionComponent {
  content = input<TeamSectionContent | null>();
}
