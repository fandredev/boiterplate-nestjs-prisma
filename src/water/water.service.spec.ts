import { Test, TestingModule } from '@nestjs/testing';
import { WaterService } from './water.service';
import { PrismaService } from 'src/database/database.service';
import { faker } from '@faker-js/faker';

describe(`${WaterService.name}`, () => {
  let service: WaterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WaterService,
        {
          provide: PrismaService,
          useValue: {
            waterConsumption: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
            user: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<WaterService>(WaterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(`Create a new water consumption`, () => {
    it(`should create a water consumption successfully when ${WaterService.prototype.createWaterConsumption.name} is called`, async () => {
      const consumption = {
        user: 1,
        consumption: parseInt(faker.number.binary({ max: 500, min: 100 })),
        readingDate: faker.date.recent(),
      };

      const fakeUser = {
        id: 1,
        email: faker.internet.email(),
        name: faker.person.firstName(),
        createdAt: faker.date.recent(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(service['prisma'].user, 'findUnique')
        .mockResolvedValue(fakeUser);
      jest
        .spyOn(service['prisma'].waterConsumption, 'create')
        .mockResolvedValue(consumption as any);

      const result = await service.createWaterConsumption(consumption);
      expect(result).toEqual(consumption);
      expect(service['prisma'].waterConsumption.create).toHaveBeenCalledWith({
        data: {
          ...consumption,
          user: {
            connect: {
              id: consumption.user,
            },
          },
        },
      });
    });

    it('should throw an error if user does not exist', async () => {
      const consumption = {
        user: 1,
        amount: parseInt(faker.number.binary({ max: 500, min: 100 })),
        date: faker.date.recent(),
      };

      jest.spyOn(service['prisma'].user, 'findUnique').mockResolvedValue(null);

      await expect(
        service.createWaterConsumption(consumption as any),
      ).rejects.toThrow('Usuário não encontrado');
    });
  });

  describe(`Get consumption history`, () => {
    it(`should get consumption history successfully when ${WaterService.prototype.getConsumptionHistory.name} is called`, async () => {
      const userId = 1;
      const startDate = faker.date.recent();
      const endDate = faker.date.recent();

      const consumption = {
        id: 1,
        consumption: parseInt(faker.number.binary({ max: 500, min: 100 })),
        readingDate: faker.date.recent(),
        user: {
          name: faker.person.firstName(),
          email: faker.internet.email(),
        },
      };

      const fakeUser = {
        id: 1,
        email: faker.internet.email(),
        name: faker.person.firstName(),
        createdAt: faker.date.recent(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(service['prisma'].user, 'findUnique')
        .mockResolvedValue(fakeUser);
      jest
        .spyOn(service['prisma'].waterConsumption, 'findMany')
        .mockResolvedValue([consumption] as any);

      const result = await service.getConsumptionHistory(
        userId,
        startDate,
        endDate,
      );
      expect(result).toEqual([consumption]);
      expect(service['prisma'].waterConsumption.findMany).toHaveBeenCalledWith({
        where: {
          userId,
          readingDate: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          id: true,
          consumption: true,
          readingDate: true,
          user: {
            select: {
              name: true,
              email: true,
              id: true,
            },
          },
        },
        orderBy: { id: 'desc' },
      });
    });

    it('should throw an error if user does not exist', async () => {
      const userId = 1;
      const startDate = faker.date.recent();
      const endDate = faker.date.recent();

      jest.spyOn(service['prisma'].user, 'findUnique').mockResolvedValue(null);

      await expect(
        service.getConsumptionHistory(userId, startDate, endDate),
      ).rejects.toThrow('Usuário não encontrado');
    });
  });

  describe(`Check high consumption`, () => {
    it(`should return true if consumption is higher than 500 when ${WaterService.prototype.checkHighConsumption.name} is called`, async () => {
      const firstConsumption = {
        id: 2,
        consumption: 501,
        readingDate: faker.date.recent(),
        createdAt: faker.date.recent(),
        updatedAt: new Date(),
        userId: 1,
        user: {
          name: faker.person.firstName(),
          email: faker.internet.email(),
        },
      };

      const secondConsumption = {
        id: 1,
        consumption: 499,
        readingDate: faker.date.recent(),
        createdAt: faker.date.recent(),
        updatedAt: new Date(),
        userId: 1,
        user: {
          name: faker.person.firstName(),
          email: faker.internet.email(),
        },
      };

      const fakeUser = {
        id: 1,
        email: faker.internet.email(),
        name: faker.person.firstName(),
        createdAt: faker.date.recent(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(service['prisma'].user, 'findUnique')
        .mockResolvedValue(fakeUser);

      jest
        .spyOn(service['prisma'].waterConsumption, 'findMany')
        .mockResolvedValue([firstConsumption, secondConsumption]);

      const result = await service.checkHighConsumption(1);
      expect(result).toEqual(true);
    });

    it(`should return false if consumption is lower than 500 when ${WaterService.prototype.checkHighConsumption.name} is called`, async () => {
      const firstConsumption = {
        id: 2,
        consumption: 499,
        readingDate: faker.date.recent(),
        createdAt: faker.date.recent(),
        updatedAt: new Date(),
        userId: 1,
        user: {
          name: faker.person.firstName(),
          email: faker.internet.email(),
        },
      };

      const secondConsumption = {
        id: 1,
        consumption: 500,
        readingDate: faker.date.recent(),
        createdAt: faker.date.recent(),
        updatedAt: new Date(),
        userId: 1,
        user: {
          name: faker.person.firstName(),
          email: faker.internet.email(),
        },
      };

      const fakeUser = {
        id: 1,
        email: faker.internet.email(),
        name: faker.person.firstName(),
        createdAt: faker.date.recent(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(service['prisma'].user, 'findUnique')
        .mockResolvedValue(fakeUser);

      jest
        .spyOn(service['prisma'].waterConsumption, 'findMany')
        .mockResolvedValue([firstConsumption, secondConsumption]);

      const result = await service.checkHighConsumption(1);
      expect(result).toEqual(false);
    });

    it('should throw an error if user does not exist', async () => {
      const consumption = {
        id: 1,
        consumption: 501,
        readingDate: faker.date.recent(),
        user: {
          name: faker.person.firstName(),
          email: faker.internet.email(),
        },
      };

      jest.spyOn(service['prisma'].user, 'findUnique').mockResolvedValue(null);

      await expect(
        service.checkHighConsumption(consumption.id),
      ).rejects.toThrow('Usuário não encontrado');
    });

    it('should return "Não há registros suficientes" when i not have registers', async () => {
      const userId = 1;

      const fakeUser = {
        id: 1,
        email: faker.internet.email(),
        name: faker.person.firstName(),
        createdAt: faker.date.recent(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(service['prisma'].user, 'findUnique')
        .mockResolvedValue(fakeUser);

      jest
        .spyOn(service['prisma'].waterConsumption, 'findMany')
        .mockResolvedValue([]);

      await expect(service.checkHighConsumption(userId)).rejects.toThrow(
        'Não há registros suficientes',
      );
    });

    it('should return "Não há registros suficientes" when i not ONLY one register', async () => {
      const userId = 1;

      const fakeUser = {
        id: 1,
        email: faker.internet.email(),
        name: faker.person.firstName(),
        createdAt: faker.date.recent(),
        updatedAt: new Date(),
      };

      const firstConsumption = {
        id: 2,
        consumption: 499,
        readingDate: faker.date.recent(),
        createdAt: faker.date.recent(),
        updatedAt: new Date(),
        userId: 1,
        user: {
          name: faker.person.firstName(),
          email: faker.internet.email(),
        },
      };

      jest
        .spyOn(service['prisma'].user, 'findUnique')
        .mockResolvedValue(fakeUser);

      jest
        .spyOn(service['prisma'].waterConsumption, 'findMany')
        .mockResolvedValue([firstConsumption]);

      await expect(service.checkHighConsumption(userId)).rejects.toThrow(
        'Não há registros suficientes',
      );
    });
  });
});
