import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreReviewComponent } from './scoreReview.component';

describe('ScoreReviewComponent', () => {
  let component: ScoreReviewComponent;
  let fixture: ComponentFixture<ScoreReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
