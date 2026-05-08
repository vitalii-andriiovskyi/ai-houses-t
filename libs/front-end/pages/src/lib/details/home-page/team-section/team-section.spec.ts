import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSectionComponent } from './team-section';

describe('TeamSection', () => {
  let component: TeamSectionComponent;
  let fixture: ComponentFixture<TeamSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamSectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
