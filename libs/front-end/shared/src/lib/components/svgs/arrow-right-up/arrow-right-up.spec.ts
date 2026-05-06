import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArrowRightUp } from './arrow-right-up';

describe('ArrowRightUp', () => {
  let component: ArrowRightUp;
  let fixture: ComponentFixture<ArrowRightUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowRightUp],
    }).compileComponents();

    fixture = TestBed.createComponent(ArrowRightUp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
