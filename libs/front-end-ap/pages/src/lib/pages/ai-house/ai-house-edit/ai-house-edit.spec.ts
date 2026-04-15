import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiHouseEdit } from './ai-house-edit';

describe('AiHouseEdit', () => {
  let component: AiHouseEdit;
  let fixture: ComponentFixture<AiHouseEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiHouseEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(AiHouseEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
