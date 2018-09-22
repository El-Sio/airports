import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurfacesComponent } from './surfaces.component';

describe('SurfacesComponent', () => {
  let component: SurfacesComponent;
  let fixture: ComponentFixture<SurfacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurfacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
