import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMultipleComponent } from './question-multiple.component';

describe('QuestionMultipleComponent', () => {
  let component: QuestionMultipleComponent;
  let fixture: ComponentFixture<QuestionMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ QuestionMultipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
