import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BegginerComponent } from './begginer.component';

describe('BegginerComponent', () => {
  let component: BegginerComponent;
  let fixture: ComponentFixture<BegginerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BegginerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BegginerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
