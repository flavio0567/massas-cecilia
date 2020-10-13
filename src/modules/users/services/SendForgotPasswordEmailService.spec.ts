// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );
  });

  it('should be able to recover the password given a email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      avatar: '123',
      name: 'Flavio Rocha',
      email: 'fmrocha@gmail.com',
      mobile: '9254759191',
      password_hash: '123456',
      is_admin: 1,
      is_active: 0
    });

    await sendForgotPasswordEmail.execute({
      email: 'fmrocha@gmail.com'
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing email', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'fmrocha@gmail.com'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate forgotten password token', async () => {
    const sendGenerateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      avatar: '123',
      name: 'Flavio Rocha',
      email: 'fmrocha@gmail.com',
      mobile: '9254759191',
      password_hash: '123456',
      is_admin: 1,
      is_active: 0
    });

    await sendForgotPasswordEmail.execute({
      email: 'fmrocha@gmail.com'
    });

    expect(sendGenerateToken).toHaveBeenCalledWith(user.id);
  });
});
