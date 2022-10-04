import { HttpClient } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { QUESTIONS_MOCK } from './questions.mock';
import { QuizzService } from './quizz.service';

const httpClientMock: Partial<HttpClient> = {
  get: jest.fn().mockReturnValue(of(QUESTIONS_MOCK)),
};

const routerMock: Partial<Router> = {
  navigate: jest.fn().mockReturnValue(Promise.resolve(true)),
};

describe('QuizzService', () => {
  let service: QuizzService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuizzService,
        { provide: HttpClient, useValue: httpClientMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    service = TestBed.inject(QuizzService);
  });

  describe('initQuestions', () => {
    describe('Given a new state of the Quizz', () => {
      describe('When questions are initialized', () => {
        test('Then a http GET request is sent', waitForAsync(() => {
          service.initQuestions().subscribe();
          expect(httpClientMock.get).toHaveBeenCalledWith(
            `${environment.publicApi}/quizz.json`
          );
          expect.assertions(1);
        }));

        test('Then the questions are emitted', waitForAsync(() => {
          service
            .initQuestions()
            .subscribe((results) => expect(results).toEqual(QUESTIONS_MOCK));
          expect.assertions(1);
        }));
      });
    });
  });

  describe('getQuestions', () => {
    describe('Given a new state of the Quizz', () => {
      describe('When questions are not already initialized', () => {
        test('Then an empty array is emitted', waitForAsync(() => {
          service
            .getQuestions()
            .subscribe((results) => expect(results).toEqual([]));
          expect.assertions(1);
        }));
      });

      describe('When questions are initialized', () => {
        beforeEach(waitForAsync(() => {
          service.initQuestions().subscribe();
        }));

        test('Then the questions are emitted', waitForAsync(() => {
          service
            .getQuestions()
            .subscribe((results) => expect(results).toEqual(QUESTIONS_MOCK));
          expect.assertions(1);
        }));
      });
    });
  });

  describe('getNbQuestions', () => {
    describe('Given a new state of the Quizz', () => {
      describe('When questions are not already initialized', () => {
        test('Then 0 is emitted', waitForAsync(() => {
          service.getNbQuestions().subscribe((nb) => expect(nb).toEqual(0));
          expect.assertions(1);
        }));
      });
      describe('When questions are initialized', () => {
        beforeEach(waitForAsync(() => {
          service.initQuestions().subscribe();
        }));

        test('Then the number of questions is emitted', waitForAsync(() => {
          service
            .getNbQuestions()
            .subscribe((nb) => expect(nb).toEqual(QUESTIONS_MOCK.length));
          expect.assertions(1);
        }));
      });
    });
  });

  describe('getQuestion', () => {
    describe('Given a Quizz state initialized', () => {
      beforeEach(waitForAsync(() => {
        service.initQuestions().subscribe();
      }));

      describe('When a specific question is retrieved using an existing index', () => {
        const index = 3;
        test('Then the corresponding question is emitted', waitForAsync(() => {
          service
            .getQuestion(index)
            .subscribe((question) =>
              expect(question).toEqual(QUESTIONS_MOCK[index])
            );
          expect.assertions(1);
        }));
      });

      describe('When a specific question is retrieved using a non existing index', () => {
        const index = 100;
        test('Then the corresponding question is emitted', waitForAsync(() => {
          service
            .getQuestion(index)
            .subscribe((question) => expect(question).toBeUndefined());
          expect.assertions(1);
        }));
      });
    });
  });

  describe('setQuestionResult', () => {
    describe('Given a Quizz state initialized and an existing question index', () => {
      const index = 3;

      beforeEach(waitForAsync(() => {
        service.initQuestions().subscribe();
      }));

      describe('When we subscribe to the default state', () => {
        test('Then the specific question status is undefined', waitForAsync(() => {
          service
            .getQuestion(index)
            .subscribe((question) =>
              expect(question?.isSuccess).toBeUndefined()
            );
          expect.assertions(1);
        }));
      });

      describe('When we update a specific answered question status', () => {
        const label = QUESTIONS_MOCK[3].label;

        beforeEach(() => service.setQuestionResult(label, true));

        test('Then the corresponding question is updated', waitForAsync(() => {
          service
            .getQuestion(index)
            .subscribe((question) => expect(question?.isSuccess).toBe(true));
          expect.assertions(1);
        }));
      });
    });
  });
});
