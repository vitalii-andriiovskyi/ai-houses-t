import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiHouses } from './ai-houses';

describe('AiHouse', () => {
  let component: AiHouses;
  let fixture: ComponentFixture<AiHouses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiHouses],
    }).compileComponents();

    fixture = TestBed.createComponent(AiHouses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
