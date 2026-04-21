import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiHouseCreate } from './ai-house-create';

describe('AiHouseCreate', () => {
  let component: AiHouseCreate;
  let fixture: ComponentFixture<AiHouseCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiHouseCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(AiHouseCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
