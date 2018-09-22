import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaysSearchSurfaceComponent } from './pays-search-surface.component';

describe('PaysSearchSurfaceComponent', () => {
  let component: PaysSearchSurfaceComponent;
  let fixture: ComponentFixture<PaysSearchSurfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaysSearchSurfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaysSearchSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
