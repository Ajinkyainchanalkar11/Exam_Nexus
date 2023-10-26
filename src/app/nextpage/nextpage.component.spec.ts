import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextpageComponent } from './nextpage.component';

describe('NextpageComponent', () => {
  let component: NextpageComponent;
  let fixture: ComponentFixture<NextpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
