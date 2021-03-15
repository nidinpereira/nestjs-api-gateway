import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let repository: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    repository = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
