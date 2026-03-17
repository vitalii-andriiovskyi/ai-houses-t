import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiHouseDetailsPage } from './ai-house-details-page';

describe('AiHouseDetailsPage', () => {
  let component: AiHouseDetailsPage;
  let fixture: ComponentFixture<AiHouseDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiHouseDetailsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AiHouseDetailsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
