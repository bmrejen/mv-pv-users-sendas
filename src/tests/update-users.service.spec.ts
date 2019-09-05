import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUsersService } from '../modules/users/services/update-users.service';

describe('UpdateUsersService', () => {
  let service: UpdateUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateUsersService],
    }).compile();

    service = module.get<UpdateUsersService>(UpdateUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
