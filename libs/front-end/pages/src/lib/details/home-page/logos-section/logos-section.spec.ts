import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogosSection } from './logos-section';

describe('LogosSection', () => {
  let component: LogosSection;
  let fixture: ComponentFixture<LogosSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogosSection],
    }).compileComponents();

    fixture = TestBed.createComponent(LogosSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
