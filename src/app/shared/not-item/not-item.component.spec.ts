import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotItemComponent } from './not-item.component';

describe('NotItemComponent', () => {
  let component: NotItemComponent;
  let fixture: ComponentFixture<NotItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
