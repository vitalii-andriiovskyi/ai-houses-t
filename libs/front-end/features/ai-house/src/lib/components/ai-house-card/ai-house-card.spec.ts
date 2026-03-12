import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiHouseCard } from './ai-house-card';

describe('AiHouseCard', () => {
  let component: AiHouseCard;
  let fixture: ComponentFixture<AiHouseCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiHouseCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AiHouseCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
