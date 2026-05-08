import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CustomButton, Heading } from '@fe/shared';

import { ImageType, type Button } from '@shared';

import {
  EmployeeCard,
  type EmployeeCardContent,
} from './employee-card/employee-card';

interface TeamSectionContent {
  title: string;
  description: string;
  button: Button;
  employees: EmployeeCardContent[];
}

const content: TeamSectionContent = {
  title: 'Team',
  description:
    'Meet the skilled and experienced team behind our successful digital marketing strategies',
  button: {
    id: 'team-section-see-all-team-button',
    text: 'See all team',
    url: '/',
  },
  employees: [
    {
      id: 'employee-card-john-smith',
      name: 'John Smith',
      position: 'CEO and Founder',
      description:
        '10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy',
      photo: {
        id: 'employee-card-john-smith-photo',
        src: 'images/home-page/team-section/john-smith.jpg',
        alt: 'Portrait of John Smith',
        type: ImageType.RegularImage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      socialLink: {
        id: 'employee-card-john-smith-linkedin-link',
        text: 'John Smith on LinkedIn',
        url: 'https://www.linkedin.com/',
      },
    },
    {
      id: 'employee-card-jane-doe',
      name: 'Jane Doe',
      position: 'Director of Operations',
      description:
        '7+ years of experience in project management and team leadership. Strong organizational and communication skills',
      photo: {
        id: 'employee-card-jane-doe-photo',
        src: 'images/home-page/team-section/jane-doe.jpg',
        alt: 'Portrait of Jane Doe',
        type: ImageType.RegularImage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      socialLink: {
        id: 'employee-card-jane-doe-linkedin-link',
        text: 'Jane Doe on LinkedIn',
        url: 'https://www.linkedin.com/',
      },
    },
    {
      id: 'employee-card-michael-brown',
      name: 'Michael Brown',
      position: 'Senior SEO Specialist',
      description:
        '5+ years of experience in SEO and content creation. Proficient in keyword research and on-page optimization',
      photo: {
        id: 'employee-card-michael-brown-photo',
        src: 'images/home-page/team-section/michael-brown.jpg',
        alt: 'Portrait of Michael Brown',
        type: ImageType.RegularImage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      socialLink: {
        id: 'employee-card-michael-brown-linkedin-link',
        text: 'Michael Brown on LinkedIn',
        url: 'https://www.linkedin.com/',
      },
    },
    {
      id: 'employee-card-emily-johnson',
      name: 'Emily Johnson',
      position: 'PPC Manager',
      description:
        '3+ years of experience in paid search advertising. Skilled in campaign management and performance analysis',
      photo: {
        id: 'employee-card-emily-johnson-photo',
        src: 'images/home-page/team-section/emily-johnson.jpg',
        alt: 'Portrait of Emily Johnson',
        type: ImageType.RegularImage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      socialLink: {
        id: 'employee-card-emily-johnson-linkedin-link',
        text: 'Emily Johnson on LinkedIn',
        url: 'https://www.linkedin.com/',
      },
    },
    {
      id: 'employee-card-brian-williams',
      name: 'Brian Williams',
      position: 'Social Media Specialist',
      description:
        '4+ years of experience in social media marketing. Proficient in creating and scheduling content, analyzing metrics, and building engagement',
      photo: {
        id: 'employee-card-brian-williams-photo',
        src: 'images/home-page/team-section/brian-williams.jpg',
        alt: 'Portrait of Brian Williams',
        type: ImageType.RegularImage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      socialLink: {
        id: 'employee-card-brian-williams-linkedin-link',
        text: 'Brian Williams on LinkedIn',
        url: 'https://www.linkedin.com/',
      },
    },
    {
      id: 'employee-card-sarah-kim',
      name: 'Sarah Kim',
      position: 'Content Creator',
      description:
        '2+ years of experience in writing and editing. Skilled in creating compelling, SEO-optimized content for various industries',
      photo: {
        id: 'employee-card-sarah-kim-photo',
        src: 'images/home-page/team-section/sarah-kim.jpg',
        alt: 'Portrait of Sarah Kim',
        type: ImageType.RegularImage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      socialLink: {
        id: 'employee-card-sarah-kim-linkedin-link',
        text: 'Sarah Kim on LinkedIn',
        url: 'https://www.linkedin.com/',
      },
    },
  ],
};

@Component({
  selector: 'lib-team-section',
  standalone: true,
  imports: [Heading, EmployeeCard, CustomButton],
  templateUrl: './team-section.html',
  styleUrl: './team-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamSectionComponent {
  content = input<TeamSectionContent | null>(content);
}
