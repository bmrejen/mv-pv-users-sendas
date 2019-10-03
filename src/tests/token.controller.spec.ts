import { Test, TestingModule } from '@nestjs/testing';
import { TokenController } from '../modules/token/controllers/token.controller';

describe('Token Controller', () => {
  let controller: TokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenController],
    }).compile();

    controller = module.get<TokenController>(TokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
