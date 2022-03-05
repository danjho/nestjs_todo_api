import { Test, TestingModule } from '@nestjs/testing';
import { MeUsersController } from './me-users.controller';

describe('UsersController', () => {
  let controller: MeUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeUsersController],
    }).compile();

    controller = module.get<MeUsersController>(MeUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
