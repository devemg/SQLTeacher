import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelsHomeComponent } from './levels-home.component';

describe('LevelsHomeComponent', () => {
  let component: LevelsHomeComponent;
  let fixture: ComponentFixture<LevelsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
