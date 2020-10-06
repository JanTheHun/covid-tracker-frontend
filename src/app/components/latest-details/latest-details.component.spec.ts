import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestDetailsComponent } from './latest-details.component';

describe('LatestDetailsComponent', () => {
  let component: LatestDetailsComponent;
  let fixture: ComponentFixture<LatestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
