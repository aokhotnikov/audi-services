/**
 * Created by Andrey Okhotnikov on 02.04.20.
 * Email: hunterov1984@gmail.com
 */
import { ConfigFactory } from '@nestjs/config/dist/interfaces/config-factory.interface';

export const config = {
  'local-production': {
    jwt: {
      secret: 'abrakadabra',
      expires_in: '60s'
    }
  },
  'local-staging': {
    jwt: {
      secret: 'abrakadabra',
      expires_in: '1d'
    }
  },
  'production': {
    jwt: {
      secret: 'secret-abrakadabra',
      expires_in: '30d'
    }
  }
};

export default (env: string): ConfigFactory => () => config[env];