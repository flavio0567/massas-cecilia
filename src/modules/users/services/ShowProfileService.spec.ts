import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      avatar: "123",
      name: "Flavio Rocha",
      email: "fmrocha@gmail.com",
      mobile: 9254759191,
      password_hash: "123456",
      is_admin: 1,
      is_active: 0,
    });

    const showUser = await showProfile.execute({
      user_id: user.id,
    });

    expect(showUser.name).toBe('Flavio Rocha');
    expect(showUser.email).toBe('fmrocha@gmail.com');
    expect(showUser.mobile).toBe(9254759191);
    expect(showUser.is_admin).toBe(1);
    expect(showUser.is_active).toBe(0);
  });

  it('should not be able to show a non-existing profile', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-profile',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
