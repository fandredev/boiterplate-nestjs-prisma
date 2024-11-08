import { UsersModule } from './users.module';

describe(`${UsersModule.name}`, () => {
  let module: UsersModule;

  beforeEach(() => {
    module = new UsersModule();
  });

  it(`#${UsersModule.name} should be defined without errors when services loads `, async () => {
    expect(module).toBeDefined();
  });
});
