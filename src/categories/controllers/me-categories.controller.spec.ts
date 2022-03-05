import { Test, TestingModule } from '@nestjs/testing';
import { MeCategoriesController } from './me-categories.controller';

describe('CategoriesController', () => {
  let controller: MeCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeCategoriesController],
    }).compile();

    controller = module.get<MeCategoriesController>(MeCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
