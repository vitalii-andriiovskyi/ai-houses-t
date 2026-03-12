import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiHouseDetails } from './ai-house-details';

describe('AiHouseDetails', () => {
  let component: AiHouseDetails;
  let fixture: ComponentFixture<AiHouseDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiHouseDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(AiHouseDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
