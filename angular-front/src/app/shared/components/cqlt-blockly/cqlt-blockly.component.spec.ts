import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CqltBlocklyComponent } from './cqlt-blockly.component';

describe('CqltBlocklyComponent', () => {
  let component: CqltBlocklyComponent;
  let fixture: ComponentFixture<CqltBlocklyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CqltBlocklyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CqltBlocklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
