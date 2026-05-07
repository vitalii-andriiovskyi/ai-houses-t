import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudiesSection } from './studies-section';

describe('StudiesSection', () => {
  let component: StudiesSection;
  let fixture: ComponentFixture<StudiesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudiesSection],
    }).compileComponents();

    fixture = TestBed.createComponent(StudiesSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
