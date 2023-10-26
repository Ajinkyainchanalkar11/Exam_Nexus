import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdationsComponent } from './updations.component';

describe('UpdationsComponent', () => {
  let component: UpdationsComponent;
  let fixture: ComponentFixture<UpdationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
