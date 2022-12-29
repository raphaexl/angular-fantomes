import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FantomeDetailComponent } from './fantome-detail.component';

describe('FantomeDetailComponent', () => {
  let component: FantomeDetailComponent;
  let fixture: ComponentFixture<FantomeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FantomeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FantomeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
