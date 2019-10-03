import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUsersController } from '../update-user/controllers/update-users.controller';

describe('UpdateUsers Controller', () => {
  let controller: UpdateUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateUsersController],
    }).compile();

    controller = module.get<UpdateUsersController>(UpdateUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
