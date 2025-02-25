import { InMemoryScooterRepository } from '../../../infrastructure/database/in-memory/scooter.repository.impl';
import { CreateScooterUseCase } from '../scooter/create-scooter.use-case';

describe('CreateScooterUseCase', () => {
  it('should create a new scooter', async () => {
    const scooterRepository = new InMemoryScooterRepository();
    const createScooterUseCase = new CreateScooterUseCase(scooterRepository);

    const scooter = await createScooterUseCase.execute({
      model: 'City 45',
      mileage: 5,
      batteryCycles: 100,
    });

    expect(scooter).toEqual({ id: '1', model: 'City 45', batteryLevel: 100 });
  });
});
