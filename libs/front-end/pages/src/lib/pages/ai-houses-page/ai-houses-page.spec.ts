import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiHousesPage } from './ai-houses-page';

describe('AiHousesPage', () => {
  let component: AiHousesPage;
  let fixture: ComponentFixture<AiHousesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiHousesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AiHousesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
