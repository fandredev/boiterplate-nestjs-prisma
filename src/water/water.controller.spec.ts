import { Test, TestingModule } from '@nestjs/testing';
import { WaterController } from './water.controller';
import { WaterService } from './water.service';
import { PrismaService } from 'src/database/database.service';
import { CreateConsumptionDto } from './dto/create-consumption.dto';

import { faker } from '@faker-js/faker';

describe(`${WaterController.name}`, () => {
  let controller: WaterController;
  let waterService: WaterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterController],
      providers: [
        PrismaService,
        {
          provide: WaterService,
          useValue: {
            createWaterConsumption: jest.fn(),
            getConsumptionHistory: jest.fn(),
            checkHighConsumption: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WaterController>(WaterController);
    waterService = module.get<WaterService>(WaterService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it(`should call #${WaterService.prototype.createWaterConsumption.name} when route is called`, async () => {
    const consumptionWaterResponse = {
      readingDate: faker.date.recent(),
      consumption: 100,
      updatedAt: faker.date.recent(),
      createdAt: faker.date.recent(),
      userId: 1,
      id: 1,
    };

    const createConsumptionDto: CreateConsumptionDto = {
      readingDate: faker.date.recent(),
      consumption: 100,
      user: 1,
    };

    jest
      .spyOn(waterService, 'createWaterConsumption')
      .mockResolvedValue(consumptionWaterResponse);

    const result =
      await controller.createConsumptionWater(createConsumptionDto);

    expect(result).toEqual(consumptionWaterResponse);
    expect(waterService.createWaterConsumption).toHaveBeenCalledWith(
      createConsumptionDto,
    );
  });

  it(`should call #${WaterService.prototype.getConsumptionHistory.name} when route is called`, async () => {
    const userId = 1;
    const startDate = '2021-01-01';
    const endDate = '2021-01-31';

    const consumptionHistory = [
      {
        readingDate: new Date(),
        consumption: 100,
        updatedAt: new Date(),
        createdAt: new Date(),
        userId: 1,
        user: {
          name: faker.person.firstName(),
          email: faker.internet.email(),
          id: 1,
        },
        id: 1,
      },
    ];

    jest
      .spyOn(waterService, 'getConsumptionHistory')
      .mockResolvedValue(consumptionHistory);

    const result = await controller.getHistory(userId, startDate, endDate);

    expect(result).toEqual(consumptionHistory);
    expect(waterService.getConsumptionHistory).toHaveBeenCalledWith(
      userId,
      new Date(startDate),
      new Date(endDate),
    );
  });

  it(`should call #${WaterService.prototype.checkHighConsumption.name} when route is called`, async () => {
    const userId = 1;

    jest.spyOn(waterService, 'checkHighConsumption').mockResolvedValue(true);

    const result = await controller.getHighConsumptionAlert(userId);

    expect(result).toEqual({
      message: 'Consumo alto em relação ao mês anterior',
    });
    expect(waterService.checkHighConsumption).toHaveBeenCalledWith(userId);
  });

  it(`should call #${WaterService.prototype.checkHighConsumption.name} when route is called and return false`, async () => {
    const userId = 1;

    jest.spyOn(waterService, 'checkHighConsumption').mockResolvedValue(false);

    const result = await controller.getHighConsumptionAlert(userId);

    expect(result).toEqual({
      message: 'Consumo normal/baixo em relação ao mês anterior',
    });
    expect(waterService.checkHighConsumption).toHaveBeenCalledWith(userId);
  });
});
