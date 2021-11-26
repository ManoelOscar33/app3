import { TestBed } from '@angular/core/testing';

import { AutenticacaoGuardService } from './autenticacao-guard.service';

describe('AutenticacaoGuardService', () => {
  let service: AutenticacaoGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticacaoGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
