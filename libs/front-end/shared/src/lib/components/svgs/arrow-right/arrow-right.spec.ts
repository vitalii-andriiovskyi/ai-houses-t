import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArrowRight } from './arrow-right';

describe('ArrowRight', () => {
  let component: ArrowRight;
  let fixture: ComponentFixture<ArrowRight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowRight],
    }).compileComponents();

    fixture = TestBed.createComponent(ArrowRight);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
