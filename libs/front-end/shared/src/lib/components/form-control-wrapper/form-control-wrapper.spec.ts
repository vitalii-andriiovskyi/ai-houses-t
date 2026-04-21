import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControlWrapper } from './form-control-wrapper';

describe('FormControlWrapper', () => {
  let component: FormControlWrapper;
  let fixture: ComponentFixture<FormControlWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormControlWrapper],
    }).compileComponents();

    fixture = TestBed.createComponent(FormControlWrapper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
