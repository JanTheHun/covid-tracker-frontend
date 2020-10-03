import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestLandingComponent } from './latest-landing.component';

describe('LatestLandingComponent', () => {
  let component: LatestLandingComponent;
  let fixture: ComponentFixture<LatestLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
