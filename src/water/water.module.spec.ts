import { WaterModule } from './water.module';

describe(`${WaterModule.name}`, () => {
  let module: WaterModule;

  beforeEach(() => {
    module = new WaterModule();
  });

  it(`#${WaterModule.name} should be defined without errors when services loads `, async () => {
    expect(module).toBeDefined();
  });
});
