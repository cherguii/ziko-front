import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmCommandComponent } from './confirm-command.component';

describe('FaqComponent', () => {
  let component: ConfirmCommandComponent;
  let fixture: ComponentFixture<ConfirmCommandComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmCommandComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
