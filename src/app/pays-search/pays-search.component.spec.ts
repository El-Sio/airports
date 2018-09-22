import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaysSearchComponent } from './pays-search.component';

describe('PaysSearchComponent', () => {
  let component: PaysSearchComponent;
  let fixture: ComponentFixture<PaysSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaysSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaysSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
