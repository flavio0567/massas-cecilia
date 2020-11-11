interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  // driver: process.env.MAIL_DRIVER || 'ethereal',
  driver: 'ses',
  defaults: {
    from: {
      email: 'contato@massasdacecilia.com.br',
      name: 'Equipe Massas da Cecilia'
    }
  }
} as IMailConfig;
