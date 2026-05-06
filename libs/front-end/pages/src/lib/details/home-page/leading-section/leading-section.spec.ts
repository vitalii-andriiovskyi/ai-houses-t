import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeadingSection } from './leading-section';

describe('LeadingSection', () => {
  let component: LeadingSection;
  let fixture: ComponentFixture<LeadingSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadingSection],
    }).compileComponents();

    fixture = TestBed.createComponent(LeadingSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
