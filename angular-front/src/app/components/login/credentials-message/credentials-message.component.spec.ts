import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsMessageComponent } from './credentials-message.component';

describe('CredentialsMessageComponent', () => {
  let component: CredentialsMessageComponent;
  let fixture: ComponentFixture<CredentialsMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredentialsMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
