import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallofameComponent } from './hallofame.component';

describe('HallofameComponent', () => {
  let component: HallofameComponent;
  let fixture: ComponentFixture<HallofameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HallofameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HallofameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
