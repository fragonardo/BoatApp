import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatListItemComponent } from './boat-list-item.component';

describe('BoatListItemComponent', () => {
  let component: BoatListItemComponent;
  let fixture: ComponentFixture<BoatListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
