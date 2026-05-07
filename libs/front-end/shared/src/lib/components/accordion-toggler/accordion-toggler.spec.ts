import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionToggler } from './accordion-toggler';

describe('AccordionToggler', () => {
  let component: AccordionToggler;
  let fixture: ComponentFixture<AccordionToggler>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionToggler],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionToggler);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders plus icon when closed', () => {
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('svg[plus]')).toBeTruthy();
    expect(element.querySelector('svg[minus]')).toBeFalsy();
  });

  it('renders minus icon when open', () => {
    fixture.componentRef.setInput('content', {
      isOpen: true,
      ariaLabelOpen: 'Open accordion section',
      ariaLabelClose: 'Close accordion section',
    });
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('svg[minus]')).toBeTruthy();
    expect(element.querySelector('svg[plus]')).toBeFalsy();
  });
});
