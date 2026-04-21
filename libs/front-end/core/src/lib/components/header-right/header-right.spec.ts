import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderRight } from './header-right';

describe('HeaderRight', () => {
  let component: HeaderRight;
  let fixture: ComponentFixture<HeaderRight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderRight],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderRight);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
