/**
 * Environment configuration for different test environments
 */
export interface Environment {
  name: string;
  baseUrl: string;
  credentials: {
    username: string;
    password: string;
  };
}

const environments: Record<string, Environment> = {
  dev: {
    name: 'Development',
    baseUrl: 'http://the-internet.herokuapp.com',
    credentials: {
      username: 'tomsmith',
      password: 'SuperSecretPassword!'
    }
  },
  staging: {
    name: 'Staging',
    baseUrl: 'http://the-internet.herokuapp.com',
    credentials: {
      username: 'tomsmith',
      password: 'SuperSecretPassword!'
    }
  },
  prod: {
    name: 'Production',
    baseUrl: 'http://the-internet.herokuapp.com',
    credentials: {
      username: 'tomsmith',
      password: 'SuperSecretPassword!'
    }
  }
};

// Get environment from env variable or default to 'dev'
const defaultEnv = 'dev';
const envName = process.env.TEST_ENV || defaultEnv;

if (!environments[envName]) {
  throw new Error(`Environment '${envName}' is not defined in environment.ts`);
}

export const env: Environment = environments[envName];

// Helper for getting full URLs
export const getUrl = (path: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${env.baseUrl}/${cleanPath}`;
}; 