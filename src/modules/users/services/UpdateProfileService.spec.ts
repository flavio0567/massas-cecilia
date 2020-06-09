import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      avatar: "123",
      name: "Flavio Rocha",
      email: "fmrocha@gmail.com",
      mobile: "9254759191",
      password_hash: "123456",
      is_admin: 1,
      is_active: 0,
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "Chico Rocha",
      email: "chico@gmail.com",
      mobile: "9254758888",
    });

    expect(updatedUser.name).toBe('Chico Rocha');
    expect(updatedUser.email).toBe('chico@gmail.com');
    expect(updatedUser.mobile).toBe('9254758888');
  });

  it('should not be able to update a non-existing profile', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-profile',
        name: 'Chico Rocha',
        email: 'chico@gmail.com',
        mobile: '9254759191',
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change a email for a pre-existing email', async () => {
    await fakeUsersRepository.create({
      avatar: "123",
      name: "Flavio Rocha",
      email: "fmrocha@gmail.com",
      mobile: "9254759191",
      password_hash: "123456",
      is_admin: 1,
      is_active: 0,
    });

    const user = await fakeUsersRepository.create({
      avatar: "123",
      name: "Flavio Rocha",
      email: "fmrocha@gmail.com",
      mobile: "9254759191",
      password_hash: "123456",
      is_admin: 1,
      is_active: 0,
    });

    await expect(
      updateProfile.execute({
        user_id: 'non-existing-profile',
        name: "Flavio Rocha",
        email: "fmrocha@gmail.com",
        mobile: "9254759191",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password informing a correct old password', async () => {
    const user = await fakeUsersRepository.create({
      avatar: "123",
      name: "Flavio Rocha",
      email: "fmrocha@gmail.com",
      mobile: "9254759191",
      password_hash: "123456",
      is_admin: 1,
      is_active: 0,
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "Flavio Moura Rocha",
      email: "fmrocha@gmail.com",
      mobile: "9254759191",
      password: "123123",
      old_password: "123456",
    });

    expect(updatedUser.password_hash).toBe('123123');
  });

  it('should not be able to update a password whitout informing an old_password', async () => {
    const user = await fakeUsersRepository.create({
      avatar: "123",
      name: "Flavio Rocha",
      email: "fmrocha@gmail.com",
      mobile: "9254759191",
      password_hash: "123456",
      is_admin: 1,
      is_active: 0,
    });

    await expect(
      updateProfile.execute({
        user_id: 'non-existing-profile',
        name: "Flavio Moura Rocha",
        email: "fmrocha@gmail.com",
        mobile: "9254759191",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password informing a wrong password', async () => {
    const user = await fakeUsersRepository.create({
      avatar: "123",
      name: "Flavio Rocha",
      email: "fmrocha@gmail.com",
      mobile: "9254759191",
      password_hash: "123456",
      is_admin: 1,
      is_active: 0,
    });

    await expect(
      updateProfile.execute({
        user_id: 'non-existing-profile',
        name: "Flavio Moura Rocha",
        email: "fmrocha@gmail.com",
        mobile: "9254759191",
        old_password: 'wrong-old-password',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
