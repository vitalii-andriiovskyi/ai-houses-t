import { Component, input, signal } from '@angular/core';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionPanel,
  AccordionHeaderPassThrough,
  AccordionPanelPassThrough,
  AccordionContentPassThrough,
  AccordionPassThrough,
} from 'primeng/accordion';

import { AccordionToggler, Heading } from '@fe/shared';

interface WorkflowStep {
  id: string;
  order: string;
  title: string;
  description: string;
}

export interface WorkflowSectionContent {
  title: string;
  description: string;
  steps: WorkflowStep[];
}

type AccordionValue = string | number | string[] | number[] | null | undefined;

@Component({
  selector: 'lib-workflow-section',
  standalone: true,
  imports: [
    Heading,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    AccordionToggler,
  ],
  templateUrl: './workflow-section.html',
  styleUrl: './workflow-section.css',
})
export class WorkflowSection {
  readonly content = input<WorkflowSectionContent | null>();

  readonly activeStepId = signal<string[]>([]);

  accordionPTOptions: AccordionPassThrough = {
    root: 'flex flex-col gap-5 lg:gap-7.5',
    motion: {
      type: 'transition',
      duration: {
        enter: 400,
        leave: 400,
      },
      enterClass: {
        from: 'max-h-0',
        active: 'max-h-[var(--pui-motion-height)] overflow-hidden !visible',
        to: 'max-h-[var(--pui-motion-height)] overflow-hidden !visible',
      },
      leaveClass: {
        from: 'max-h-[var(--pui-motion-height)] overflow-hidden !visible',
        active: 'max-h-0 overflow-hidden !visible',
        to: 'max-h-0 overflow-hidden',
      },
    },
  };

  panelPTOptions: AccordionPanelPassThrough = {
    root: 'overflow-hidden border border-primary rounded-[2.8125rem] bg-tertiary shadow-[0_5px_0_0_var(--color-primary)] data-[p-active=true]:bg-secondary transition-colors duration-300',
  };

  headerPTOptions: AccordionHeaderPassThrough = {
    root: 'p-7.5 flex justify-between items-center gap-8 lg:py-10.25 lg:px-15 hover:cursor-pointer',
  };

  contentPTOptions: AccordionContentPassThrough = {
    // root: 'block',
    // contentWrapper: '',
    //  content: ''
  };

  protected onAccordionValueChange(value: AccordionValue): void {
    if (Array.isArray(value)) {
      this.activeStepId.set(
        value.filter((v) => typeof v === 'string') as string[],
      );
      return;
    }

    if (value === null || value === undefined) {
      this.activeStepId.set([]);
      return;
    }

    this.activeStepId.set([String(value)]);
  }

  protected isStepOpen(stepId: string): boolean {
    return this.activeStepId().includes(stepId);
  }
}
