import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSingleComponent } from './question-single.component';

describe('QuestionFormComponent', () => {
  let component: QuestionSingleComponent;
  let fixture: ComponentFixture<QuestionSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ QuestionSingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
