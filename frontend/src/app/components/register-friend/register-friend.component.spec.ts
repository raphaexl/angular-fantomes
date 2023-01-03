import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFriendComponent } from './register-friend.component';

describe('RegisterFriendComponent', () => {
  let component: RegisterFriendComponent;
  let fixture: ComponentFixture<RegisterFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFriendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
