import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveItem } from './remove-item';

describe('RemoveItem', () => {
  let component: RemoveItem;
  let fixture: ComponentFixture<RemoveItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveItem],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
