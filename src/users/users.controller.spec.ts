import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/database/database.service';
import { faker } from '@faker-js/faker';
import { Prisma, User } from '@prisma/client';

describe(`${UsersController.name}`, () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        PrismaService,
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
            getUsers: jest.fn(),
            getUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it(`should call #${UsersService.prototype.createUser.name} when route is called`, async () => {
    const user: Prisma.UserCreateInput = {
      email: faker.internet.email(),
      name: faker.person.firstName(),
    };

    const userCreated: User = {
      id: 1,
      ...user,
      createdAt: faker.date.recent(),
      updatedAt: new Date(),
    };

    jest.spyOn(usersService, 'createUser').mockResolvedValue(userCreated);
    const createUserResult = await controller.createUser(user);

    expect(createUserResult).toEqual(userCreated);
    expect(usersService.createUser).toHaveBeenCalledWith(user);
  });

  it(`should call #${UsersService.prototype.getUsers.name} when route is called`, async () => {
    const users: User[] = [
      {
        id: 1,
        email: faker.internet.email(),
        name: faker.person.firstName(),
        createdAt: faker.date.recent(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        email: faker.internet.email(),
        name: faker.person.firstName(),
        createdAt: faker.date.recent(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(usersService, 'getUsers').mockResolvedValue(users);
    const getUsersResult = await controller.getUsers();

    expect(getUsersResult).toEqual(users);
    expect(usersService.getUsers).toHaveBeenCalled();
  });

  it(`should call #${UsersService.prototype.getUserById.name} when route is called`, async () => {
    const user: User = {
      id: 1,
      email: faker.internet.email(),
      name: faker.person.firstName(),
      createdAt: faker.date.recent(),
      updatedAt: new Date(),
    };

    jest.spyOn(usersService, 'getUserById').mockResolvedValue(user);
    const getUserResult = await controller.getUserById(String(user.id));

    expect(getUserResult).toEqual(user);
    expect(usersService.getUserById).toHaveBeenCalledWith(user.id);
  });
});
