import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuillEditor } from './quill-editor';

describe('QuillEditor', () => {
  let component: QuillEditor;
  let fixture: ComponentFixture<QuillEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuillEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(QuillEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
