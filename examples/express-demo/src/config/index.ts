import dotenv from 'dotenv';

dotenv.config();

/**
 * Application configuration.
 * Centralizes environment variable access.
 */
export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  appName: process.env.APP_NAME || 'ExpressDemo',
};
