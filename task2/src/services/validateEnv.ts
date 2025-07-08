import { EnvironmentVariableError } from './customErrors';

export function validateEnv(){
    if (!process.env. DEFAULT_PORT) {
      throw new EnvironmentVariableError('DEFAULT_PORT');
    }
    if (!process.env.SENTRY_DSN) {
      throw new EnvironmentVariableError('SENTRY_DSN');
    }
    if (!process.env.MONGODB_URI) {
      throw new EnvironmentVariableError('MONGODB_URI');
    }
    if (!process.env.NODE_ENV) {
      throw new EnvironmentVariableError('NODE_ENV');
    }

  return process.env.NODE_ENV || 'development';
}