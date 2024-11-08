import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/database/database.service';
import { Prisma, User } from '@prisma/client';
import { faker } from '@faker-js/faker';

describe(`${UsersService.name}`, () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(`Create a new user`, () => {
    it(`should create a user successfully when ${UsersService.prototype.createUser.name} is called`, async () => {
      const user: Prisma.UserCreateInput = {
        email: faker.internet.email(),
        name: faker.person.firstName(),
      };

      const userCreated: User = {
        id: 1,
        ...user,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.user, 'create').mockResolvedValue(userCreated);

      const result = await service.createUser(user);
      expect(result).toEqual(userCreated);
      expect(prismaService.user.create).toHaveBeenCalledWith({ data: user });
    });

    it('should throw an error if user creation fails', async () => {
      const userInput: Prisma.UserCreateInput = {
        email: 'test@example.com',
        name: 'Test User',
      };

      jest
        .spyOn(prismaService.user, 'create')
        .mockRejectedValue(new Error('User creation failed'));

      await expect(service.createUser(userInput)).rejects.toThrow(
        'User creation failed',
      );
    });
  });

  describe(`Get User`, () => {
    it(`should get a user successfully when ${UsersService.prototype.getUserById.name} when mock returns a user`, async () => {
      const userId = 1;
      const user: User = {
        id: userId,
        email: faker.internet.email(),
        name: faker.person.firstName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);
      const result = await service.getUserById(userId);

      expect(result).toEqual(user);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });

    it(`should throw an error when ${UsersService.prototype.getUserById.name} is called and user does not exist`, async () => {
      const userId = 1;
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(service.getUserById(userId)).rejects.toThrow(
        'Usuário não encontrado',
      );
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });
  });
});
