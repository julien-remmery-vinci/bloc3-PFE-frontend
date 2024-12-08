import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsOddCompleteComponent } from './forms-odd-complete.component';

describe('FormsOddCompleteComponent', () => {
  let component: FormsOddCompleteComponent;
  let fixture: ComponentFixture<FormsOddCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsOddCompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsOddCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
