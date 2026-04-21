import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiclePreview } from './vehicle-preview';

describe('VehiclePreview', () => {
  let component: VehiclePreview;
  let fixture: ComponentFixture<VehiclePreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclePreview],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiclePreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
