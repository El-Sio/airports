import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAirportsComponent } from './top-airports.component';

describe('TopAirportsComponent', () => {
  let component: TopAirportsComponent;
  let fixture: ComponentFixture<TopAirportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopAirportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAirportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
