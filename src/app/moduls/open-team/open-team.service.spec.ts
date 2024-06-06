import { TestBed } from '@angular/core/testing';

import { OpenTeamService } from './open-team.service';

describe('OpenTeamService', () => {
  let service: OpenTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
