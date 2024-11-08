import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './database.service';

describe(`${PrismaService.name}`, () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have a $connect method', () => {
    expect(service.$connect).toBeDefined();
  });

  it('should call $connect on module init when service is called with onModuleInit', async () => {
    const connectSpy = jest.spyOn(service, '$connect').mockResolvedValue();
    await service.onModuleInit();
    expect(connectSpy).toHaveBeenCalled();
  });
});
