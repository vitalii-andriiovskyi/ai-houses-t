import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkflowSection } from './workflow-section';

describe('WorkflowSection', () => {
  let component: WorkflowSection;
  let fixture: ComponentFixture<WorkflowSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowSection],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkflowSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
