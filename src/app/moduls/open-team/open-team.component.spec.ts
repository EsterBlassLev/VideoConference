import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTeamComponent } from './open-team.component';

describe('OpenTeamComponent', () => {
  let component: OpenTeamComponent;
  let fixture: ComponentFixture<OpenTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
