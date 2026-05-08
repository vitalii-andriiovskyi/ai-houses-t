import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkedIn } from './linked-in';

describe('LinkedIn', () => {
  let component: LinkedIn;
  let fixture: ComponentFixture<LinkedIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkedIn],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkedIn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
