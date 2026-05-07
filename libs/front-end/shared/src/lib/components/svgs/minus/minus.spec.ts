import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Minus } from './minus';

describe('Minus', () => {
  let component: Minus;
  let fixture: ComponentFixture<Minus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Minus],
    }).compileComponents();

    fixture = TestBed.createComponent(Minus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
