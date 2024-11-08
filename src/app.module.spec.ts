import { AppModule } from './app.module';

describe(`${AppModule.name}`, () => {
  let module: AppModule;

  beforeEach(() => {
    module = new AppModule();
  });

  it(`#${AppModule.name} should be defined without errors when services loads `, async () => {
    expect(module).toBeDefined();
  });
});
