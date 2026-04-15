import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiHouseIndex } from './ai-house-index';

describe('AiHouse', () => {
  let component: AiHouseIndex;
  let fixture: ComponentFixture<AiHouseIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiHouseIndex],
    }).compileComponents();

    fixture = TestBed.createComponent(AiHouseIndex);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
