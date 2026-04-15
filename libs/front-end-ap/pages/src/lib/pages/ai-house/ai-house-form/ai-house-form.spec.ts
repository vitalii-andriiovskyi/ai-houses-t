import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiHouseForm } from './ai-house-form';

describe('AiHouseForm', () => {
  let component: AiHouseForm;
  let fixture: ComponentFixture<AiHouseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiHouseForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AiHouseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
